/*
 * Checks that every viewport-triggered reveal has actually resolved, i.e. no
 * section is left invisible at opacity 0 after the user scrolls past it. Also
 * reports any image the browser still has not requested, with its ancestor
 * chain, so a genuinely stuck element can be traced.
 */
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:3213';
const ROUTES = process.env.ROUTES
  ? process.env.ROUTES.split(',')
  : ['/', '/services/', '/retail-security-guard-service/', '/about-us/', '/faq/', '/contact/', '/blog/', '/blog/benefits-of-hiring-a-private-security-firm/', '/security-jobs-oregon-washington/', '/sitemap/'];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  let problems = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
    await scrollThrough(page);
    await page.waitForTimeout(1200);

    const result = await page.evaluate(() => {
      const stuck = Array.from(document.querySelectorAll('[data-reveal]'))
        .filter((el) => el.dataset.reveal !== 'in')
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);

      /* Anything still at opacity 0 that is actually on screen. */
      const invisible = [];
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.opacity !== '0') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const onScreen = r.top < window.innerHeight && r.bottom > 0;
        const text = (el.textContent || '').trim().slice(0, 40);
        if (onScreen && text) invisible.push(`${el.tagName.toLowerCase()} "${text}"`);
      }

      const unloaded = Array.from(document.images)
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => {
          const chain = [];
          let n = i;
          while (n && n !== document.body && chain.length < 4) {
            const r = n.getBoundingClientRect();
            chain.push(
              `${n.tagName.toLowerCase()}[${Math.round(r.width)}x${Math.round(r.height)}]${
                n.dataset && n.dataset.reveal ? ' reveal=' + n.dataset.reveal : ''
              }`,
            );
            n = n.parentElement;
          }
          return `${(i.currentSrc || i.src).split('%2F').pop()} <- ${chain.join(' < ')}`;
        });

      return { stuck, invisible: [...new Set(invisible)], unloaded };
    });

    const pageProblems = result.stuck.length + result.invisible.length + result.unloaded.length;
    if (pageProblems) problems++;
    console.log(`\n${pageProblems ? 'FAIL' : 'PASS'}  ${route}`);
    if (result.stuck.length) console.log(`   stuck reveal: ${result.stuck.join(' | ')}`);
    if (result.invisible.length) console.log(`   invisible on screen: ${result.invisible.join(' | ')}`);
    if (result.unloaded.length) console.log(`   not requested: ${result.unloaded.join('\n                ')}`);
    await page.close();
  }

  await browser.close();
  console.log(`\n${problems} of ${ROUTES.length} routes with unresolved elements`);
})();