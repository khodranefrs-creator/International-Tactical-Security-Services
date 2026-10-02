/*
 * Self-test for check-tokens.js.
 *
 * A checker that silently reports "none" is worse than no checker, so this
 * plants a file containing one declared token, one undeclared token and several
 * real Tailwind utilities, then asserts the checker flags exactly the right
 * one and nothing else.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const probePath = path.join(__dirname, 'src', '__token_probe__.tsx');

fs.writeFileSync(
  probePath,
  `export function Probe() {
  return (
    <div className="text-ink-faint bg-ivory-deep text-navy/70 md:text-brass-deep border-l-2 text-balance border-dashed text-white text-ink-ghost" />
  );
}
`,
);

let output = '';
let exitCode = 0;
try {
  output = execFileSync(process.execPath, ['check-tokens.js'], { encoding: 'utf8' });
} catch (err) {
  output = err.stdout || '';
  exitCode = err.status;
} finally {
  fs.unlinkSync(probePath);
}

/* Only the findings section matters; the header deliberately lists every
   declared token, which would otherwise match the "must stay quiet"
   assertions below. */
const findings = output.split('no matching --color-* token:')[1] ?? '';

console.log('--- check-tokens.js with a planted probe ---');
console.log('findings:');
console.log(findings.trim() || '  (none)');
console.log(`exit code: ${exitCode}\n`);

const expectations = [
  ['flags the undeclared token ink-ghost', /\bink-ghost\b/.test(findings)],
  ['leaves declared ink-faint unflagged', !/\bink-faint\b/.test(findings)],
  ['leaves bg-ivory-deep unflagged', !/ivory-deep/.test(findings)],
  ['leaves text-brass-deep unflagged', !/\bbrass-deep\b/.test(findings)],
  ['does not flag border-l-2 as a token', !/\bl-2\b/.test(findings)],
  ['does not flag text-balance as a token', !/\bbalance\b/.test(findings)],
  ['does not flag border-dashed as a token', !/\bdashed\b/.test(findings)],
  ['does not flag text-white as a token', !/\bwhite\b/.test(findings)],
  ['exits non-zero when something is missing', exitCode !== 0],
];

let failed = 0;
for (const [label, pass] of expectations) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`);
  if (!pass) failed++;
}

console.log(`\n${failed ? `SELF-TEST FAILED (${failed})` : 'SELF-TEST PASSED'}`);
process.exitCode = failed ? 1 : 0;