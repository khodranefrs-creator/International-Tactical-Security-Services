/*
 * A hyphenated colour token that is missing from globals.css renders with no
 * colour at all in Tailwind v4, and neither the compiler nor the type checker
 * will say anything. This caught a real one (`text-ink-faint` used on four
 * pages while only `ink-muted` and `ink-soft` existed).
 *
 * It reads only className attribute values, not the whole file, so prose and
 * slugs cannot produce false positives.
 */
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'src', 'app', 'globals.css'), 'utf8');
const declared = new Set([...css.matchAll(/--color-([a-z0-9-]+):/g)].map((m) => m[1]));

const BUILTIN = new Set([
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow',
  'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet',
  'purple', 'fuchsia', 'pink', 'rose', 'white', 'black', 'current', 'transparent',
  'inherit',
]);

/* Utilities whose trailing token is a colour. */
const COLOUR_UTIL = /^(?:[a-z-]+:)*(text|bg|border|ring|decoration|fill|stroke|divide|outline|accent|caret|placeholder|from|via|to)-([a-z][a-z0-9-]*)$/;

/* Tokens that are real Tailwind utilities but not colours: side/width
   keywords for `border-*`, `text-*` alignment and wrapping, background
   position and repeat. */
const NOT_A_COLOUR = new Set([
  'b', 't', 'l', 'r', 'y', 'x', 's', 'e', 'be', 'bs', 'be', 'inline', 'block',
  'dashed', 'dotted', 'double', 'solid', 'hidden', 'none', 'collapse',
  'left', 'center', 'right', 'justify', 'start', 'end', 'top', 'bottom', 'middle',
  'clip', 'ellipsis', 'wrap', 'balance', 'pretty', 'nowrap', 'normal',
  'repeat', 'no-repeat', 'cover', 'contain', 'full', 'screen', 'min', 'max',
  'fit', 'auto', 'baseline', 'sub', 'super', 'top', 'middle', 'bottom',
  'thin', 'medium', 'thick', 'thin', 'tight', 'loose', 'wider', 'widest',
  'tightest', 'truncate', 'uppercase', 'lowercase', 'capitalize', 'ordinal',
  'decimal', 'roman', 'alpha', 'numeric', 'lining', 'oldstyle', 'proportional',
  'tabular', ' slashed-zero', 'default', 'safe', 'unsafe',
]);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const unknown = new Map();

for (const file of walk(path.join(__dirname, 'src')).filter((f) => /\.(tsx|ts|css)$/.test(f))) {
  const contents = fs.readFileSync(file, 'utf8');
  const rel = path.relative(__dirname, file);

  /* Only strings that are unambiguously a class attribute. */
  const classValues = [];
  for (const m of contents.matchAll(/className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
    classValues.push({ value: m[1] ?? m[2] ?? m[3] ?? '', index: m.index });
  }
  /* Plus any cn()/classList-style string literals, which hold plain classes too. */
  for (const m of contents.matchAll(/\bcn\(\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`)/g)) {
    classValues.push({ value: m[1] ?? m[2] ?? m[3] ?? '', index: m.index });
  }

  for (const { value, index } of classValues) {
    const line = contents.slice(0, index).split('\n').length;
    for (const cls of value.split(/\s+/)) {
      if (!cls) continue;
      const m = COLOUR_UTIL.exec(cls);
      if (!m) continue;
      const token = m[2];
      /* Layout keywords and side/width utilities that share a colour prefix. */
      if (NOT_A_COLOUR.has(token)) continue;
      /* `border-l-2`, `pt-2` style: one or two letters plus a number. */
      if (/^[a-z]{1,2}-\d+$/.test(token)) continue;
      if (BUILTIN.has(token)) continue;
      if (declared.has(token)) continue;
      if (!unknown.has(token)) unknown.set(token, []);
      unknown.get(token).push(`${rel}:${line}`);
    }
  }
}

console.log('declared tokens:', [...declared].sort().join(', '));
console.log('\ncolour classes with no matching --color-* token:');
if (!unknown.size) console.log('  none');
for (const [token, where] of [...unknown].sort()) {
  console.log(`  ${token}  (${where.length}x)`);
  where.slice(0, 4).forEach((w) => console.log(`      ${w}`));
}
process.exitCode = unknown.size ? 1 : 0;