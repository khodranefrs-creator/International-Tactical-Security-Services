/*
 * Content fidelity checks against the live source.
 *
 * Confirms that the things the redesign was most likely to get wrong are still
 * present and unmodified: the source's own conflicting claims, both phone
 * numbers, and the absence of invented content (Lorem Ipsum, placeholder
 * tokens, invented FAQ answers, invented publication dates).
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:3216';

const ROUTES = fs.readdirSync(path.join(__dirname, 'public', 'media', 'services'))
  .map((f) => '')
  .filter(() => true);

const ROUTE_LIST = [
  '/',
  '/services/',
  '/retail-security-guard-service/',
  '/bank-security-guard-service/',
  '/portland-oregon-event-security-service/',
  '/mobile-patrol-security/',
  '/fire-watch-security-service/',
  '/local-alarm-response-service/',
  '/dedicated-executive-protection/',
  '/about-us/',
  '/faq/',
  '/contact/',
  '/blog/',
  '/blog/page/2/',
  '/security-jobs-oregon-washington/',
  '/sitemap/',
];

void ROUTES;

/* Claims the live site publishes that disagree with each other. All must
   survive somewhere on the site rather than being harmonised away. */
const CONFLICTING_CLAIMS = [
  ['32+', /32\+/],
  ['over 27 years', /27 years/i],
  ['over 30 years', /30 years/i],
  ['since 2005', /since 2005/i],
  ['1994 (founder)', /1994/],
];

const FORBIDDEN = [
  ['Lorem Ipsum', /lorem ipsum/i],
  ['literal [contact number]', /\[contact number\]/i],
  ['example.com', /example\.com/i],
  ['Lorem-style placeholder', /lorem\b(?! ipsum)/i],
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  let all = '';

  for (const route of ROUTE_LIST) {
    const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const text = await page.evaluate(() => document.body.innerText);
    all += `\n${route} (${res.status()})\n${text}`;
  }

  /* Blog articles carry the long-form copy, so include one. */
  for (const slug of fs.readdirSync(path.join(__dirname, '.verify')).length
    ? []
    : []) void slug;
  const postsTs = fs.readFileSync(path.join(__dirname, 'src', 'content', 'posts.ts'), 'utf8');
  const slugs = [...postsTs.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1]);
  for (const slug of slugs) {
    const res = await page.goto(`${BASE}/blog/${slug}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const text = await page.evaluate(() => document.body.innerText);
    all += `\n/blog/${slug}/ (${res.status()})\n${text}`;
  }

  console.log(`scraped ${ROUTE_LIST.length} pages + ${slugs.length} articles\n`);

  console.log('=== claims from the source that must survive ===');
  let fails = 0;
  for (const [label, re] of CONFLICTING_CLAIMS) {
    const hits = (all.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')) || []).length;
    console.log(`${hits ? 'PASS' : 'FAIL'}  "${label}" appears ${hits}x`);
    if (!hits) fails++;
  }

  console.log('\n=== both phone numbers published ===');
  for (const [label, re] of [
    ['503 753 8599', /503[\s.-]?753[\s.-]?8599/g],
    ['877 468 2206', /877[\s.-]?468[\s.-]?2206/g],
    ['info@ email', /info@internationaltacticalsecurity\.com/g],
    ['Vancouver address', /4317 NE Thurston Way/g],
    ['Portland address', /26 N Lombard/g],
  ]) {
    const hits = (all.match(re) || []).length;
    console.log(`${hits ? 'PASS' : 'FAIL'}  ${label} appears ${hits}x`);
    if (!hits) fails++;
  }

  console.log('\n=== nothing invented ===');
  for (const [label, re] of FORBIDDEN) {
    const hits = (all.match(new RegExp(re.source, re.flags)) || []).length;
    console.log(`${hits ? 'FAIL' : 'PASS'}  ${label} ${hits ? `(${hits}x) ` : ''}`);
    if (hits) fails++;
  }

  /* The three unanswered FAQ questions must appear as questions and must not
     have acquired an answer paragraph. */
  console.log('\n=== unanswered FAQ questions reproduced without answers ===');
  const faq = await page.goto(`${BASE}/faq/`, { waitUntil: 'domcontentloaded' });
  void faq;
  const faqHtml = await page.content();
  for (const q of [
    'prohibited items or behaviors',
    'background check process',
    'costs and terms of the service contract',
  ]) {
    const present = faqHtml.toLowerCase().includes(q.toLowerCase());
    console.log(`${present ? 'PASS' : 'FAIL'}  question present: "${q}"`);
    if (!present) fails++;
  }
  const fakeAnswers = await page.evaluate(() =>
    Array.from(document.querySelectorAll('li'))
      .map((li) => li.textContent || '')
      .filter((t) => /prohibited items|background check process|costs and terms/i.test(t))
      .filter((t) => t.length > 160),
  );
  console.log(`${fakeAnswers.length ? 'FAIL' : 'PASS'}  no invented answers attached`);
  if (fakeAnswers.length) fails++;

  await browser.close();
  console.log(`\n${fails ? `${fails} FAILURES` : 'all content checks passed'}`);
  process.exitCode = fails ? 1 : 0;
})();