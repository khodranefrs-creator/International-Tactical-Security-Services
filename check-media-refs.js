/* Reports any /media/... reference in src/ that has no matching file. */
const fs = require('fs');
const path = require('path');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const refs = new Map();
for (const f of walk(path.join(__dirname, 'src')).filter((f) => /\.(tsx|ts|css)$/.test(f))) {
  const c = fs.readFileSync(f, 'utf8');
  for (const m of c.matchAll(/\/media\/[A-Za-z0-9._/-]+/g)) {
    if (!refs.has(m[0])) refs.set(m[0], new Set());
    refs.get(m[0]).add(path.relative(__dirname, f));
  }
}

const missing = [];
for (const [ref, where] of [...refs].sort()) {
  const p = path.join(__dirname, 'public', ref.replace(/\//g, path.sep));
  const ok = fs.existsSync(p);
  console.log(`${ok ? 'ok  ' : 'MISS'}  ${ref}`);
  if (!ok) missing.push(`${ref}   <- ${[...where].join(', ')}`);
}
console.log(`\n${refs.size} distinct references, ${missing.length} missing`);
missing.forEach((m) => console.log('  ' + m));
process.exitCode = missing.length ? 1 : 0;