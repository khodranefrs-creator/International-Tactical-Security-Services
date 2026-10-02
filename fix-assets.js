/*
 * The WordPress site serves every image as WebP regardless of the file
 * extension in the URL, so the downloads are WebP bytes named .jpg / .png.
 * Next's image optimizer refuses to decode a file whose extension does not
 * match its content, which produced "isn't a valid image" for every asset.
 *
 * This renames each file to its real format and rewrites every reference in
 * src/, then decodes each file with sharp to prove it is genuinely readable.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const MEDIA = path.join(ROOT, 'public', 'media');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function realFormat(file) {
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(16);
  fs.readSync(fd, buf, 0, 16, 0);
  fs.closeSync(fd);
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP')
    return 'webp';
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpg';
  if (buf.slice(1, 4).toString('ascii') === 'PNG') return 'png';
  if (buf.slice(0, 4).toString('ascii') === 'GIF8') return 'gif';
  return null;
}

(async () => {
  /* 1. rename to true format ---------------------------------------- */
  const renames = [];
  for (const f of walk(MEDIA)) {
    const fmt = realFormat(f);
    if (!fmt) {
      console.log(`  UNRECOGNISED ${path.relative(ROOT, f)}`);
      continue;
    }
    const ext = path.extname(f).toLowerCase();
    const want = '.' + fmt;
    if (ext === want) continue;
    const target = f.slice(0, -ext.length) + want;
    if (fs.existsSync(target)) {
      fs.unlinkSync(f);
      renames.push({ from: f, to: target, merged: true });
    } else {
      fs.renameSync(f, target);
      renames.push({ from: f, to: target });
    }
  }

  /* 2. rewrite references in src/ ----------------------------------- */
  const files = walk(path.join(ROOT, 'src')).filter((f) => /\.(tsx|ts|css)$/.test(f));
  let changed = 0;
  for (const f of files) {
    const before = fs.readFileSync(f, 'utf8');
    let after = before;
    for (const r of renames) {
      const oldRef = '/media/' + path.relative(MEDIA, r.from).split(path.sep).join('/');
      const newRef = '/media/' + path.relative(MEDIA, r.to).split(path.sep).join('/');
      after = after.split(oldRef).join(newRef);
    }
    if (after !== before) {
      fs.writeFileSync(f, after);
      changed++;
    }
  }

  /* 3. verify every asset decodes, and report dimensions ------------- */
  console.log(`\nrenamed ${renames.length} files, rewrote references in ${changed} source files\n`);
  console.log('file'.padEnd(52) + 'format   size      dimensions');
  let bad = 0;
  let total = 0;
  for (const f of walk(MEDIA)) {
    total += fs.statSync(f).size;
    const rel = path.relative(ROOT, f);
    try {
      const meta = await sharp(f).metadata();
      console.log(
        rel.padEnd(52) +
          meta.format.padEnd(8) +
          (Math.round(fs.statSync(f).size / 1024) + ' KB').padEnd(10) +
          `${meta.width}x${meta.height}`,
      );
    } catch (err) {
      bad++;
      console.log(`${rel}  UNREADABLE: ${err.message}`);
    }
  }
  console.log(`\n${bad} unreadable, media total ${(total / 1024 / 1024).toFixed(1)} MB`);
  process.exitCode = bad ? 1 : 0;
})();