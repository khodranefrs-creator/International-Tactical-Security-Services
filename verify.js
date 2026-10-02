/**
 * Verification harness.
 *
 * I cannot view rendered images, so this checks the things a visual review
 * would otherwise catch: horizontal overflow, broken images, console errors,
 * clipped or overlapping text, missing alt text, heading-order gaps, unlabelled
 * form controls, dead internal links, and contrast of the palette pairs the
 * design system actually uses. Screenshots are written to disk for a human.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:3210';
const SHOTS = process.env.SHOTS || path.join(process.cwd(), '.verify');

const ROUTES = [
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
  '/blog/benefits-of-hiring-a-private-security-firm/',
  '/security-jobs-oregon-washington/',
  '/sitemap/',
  '/no-such-page-verify-404/',
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

/* Palette pairs the design system relies on, as [fg, bg, label]. */
const CONTRAST_PAIRS = [
  ['#35414a', '#f4f3ef', 'ink body on ivory'],
  ['#35414a', '#ffffff', 'ink body on white'],
  ['#35414a', '#ebe9e3', 'ink body on ivory-deep'],
  ['#101f2b', '#f4f3ef', 'navy text on ivory'],
  ['#101f2b', '#ffffff', 'navy text on white'],
  ['#5d6870', '#f4f3ef', 'ink-muted on ivory'],
  ['#5d6870', '#ffffff', 'ink-muted on white'],
  ['#5d6870', '#ebe9e3', 'ink-muted on ivory-deep'],
  ['#4a5761', '#f4f3ef', 'ink-soft on ivory'],
  ['#5f6970', '#f4f3ef', 'ink-faint on ivory'],
  ['#5f6970', '#ffffff', 'ink-faint on white'],
  ['#5f6970', '#ebe9e3', 'ink-faint on ivory-deep'],
  ['#ffffff', '#101f2b', 'ivory text on navy'],
  ['#ffffff', '#0a151e', 'ivory text on deep navy'],
  ['#ffffff', '#172a38', 'ivory text on navy-lift'],
  ['#c5a56a', '#0a151e', 'brass on deep navy'],
  ['#c5a56a', '#101f2b', 'brass on navy'],
  ['#c5a56a', '#172a38', 'brass on navy-lift'],
  ['#7d6335', '#f4f3ef', 'brass-deep on ivory'],
  ['#7d6335', '#ffffff', 'brass-deep on white'],
  ['#7d6335', '#ebe9e3', 'brass-deep on ivory-deep'],
  ['#0a151e', '#c5a56a', 'deep navy text on brass fill'],
];

function srgb(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
}
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });

  /* ---------------- contrast report (static, no browser needed) ------- */
  console.log('\n=== CONTRAST (WCAG AA needs 4.5:1 body / 3:1 large) ===');
  const contrastFails = [];
  for (const [fg, bg, label] of CONTRAST_PAIRS) {
    const r = contrast(fg, bg);
    const ok = r >= 4.5;
    if (!ok) contrastFails.push(`${label} ${fg} on ${bg} = ${r.toFixed(2)}`);
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}  ${label}`);
  }

  /* ---------------- route crawl ------------------------------------- */
  const problems = [];
  const statusByRoute = {};
  const internalLinks = new Set();
  const imageRequests = new Map();

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];

    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300));
    });
    page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 300)));
    page.on('requestfailed', (r) =>
      failedRequests.push(`${r.url().slice(0, 160)} :: ${r.failure()?.errorText}`),
    );
    page.on('response', (r) => {
      const u = r.url();
      if (/\.(png|jpe?g|svg|webp|avif|ico)(\?|$)/i.test(u)) {
        imageRequests.set(u, r.status());
      }
    });

    for (const route of ROUTES) {
      consoleErrors.length = 0;
      pageErrors.length = 0;
      failedRequests.length = 0;

      const res = await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });
      const status = res ? res.status() : 0;
      if (vp.name === 'desktop') statusByRoute[route] = status;

      if (status >= 400 && !route.includes('no-such-page')) {
        problems.push(`[${vp.name}] ${route} returned HTTP ${status}`);
      }

      /* Scroll the whole page so lazy-loaded images actually request, then
         return to the top. Without this every below-the-fold image reports as
         broken simply because it was never fetched. */
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.6;
        const height = () => document.body.scrollHeight;
        for (let y = 0; y < height(); y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 220));
        }
        window.scrollTo(0, height());
        await new Promise((r) => setTimeout(r, 600));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      });

      /* wait for images to settle */
      await page
        .waitForFunction(
          () => Array.from(document.images).every((i) => i.complete),
          null,
          { timeout: 30000 },
        )
        .catch(() => {});
      await page.waitForTimeout(350);

      /* --- horizontal overflow --- */
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        const overflowPx = de.scrollWidth - de.clientWidth;
        const offenders = [];
        if (overflowPx > 1) {
          const limit = de.clientWidth;
          for (const el of document.querySelectorAll('body *')) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            if (r.right > limit + 1 || r.left < -1) {
              offenders.push({
                tag: el.tagName.toLowerCase(),
                cls: (el.className && String(el.className).slice(0, 90)) || '',
                left: Math.round(r.left),
                right: Math.round(r.right),
              });
            }
            if (offenders.length > 6) break;
          }
        }
        return { overflowPx, clientWidth: de.clientWidth, offenders };
      });
      if (overflow.overflowPx > 1) {
        problems.push(
          `[${vp.name}] ${route} horizontal overflow ${overflow.overflowPx}px (viewport ${overflow.clientWidth})` +
            (overflow.offenders.length
              ? ` :: ${overflow.offenders.map((o) => `${o.tag}.${o.cls}[${o.left}..${o.right}]`).join(' | ')}`
              : ''),
        );
      }

      /* --- broken images --- */
      const brokenImgs = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => !i.complete || i.naturalWidth === 0)
          .map((i) => i.currentSrc || i.src),
      );
      for (const src of brokenImgs) {
        problems.push(`[${vp.name}] ${route} broken image: ${src.slice(0, 140)}`);
      }

      /* --- missing alt --- */
      const missingAlt = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => i.getAttribute('alt') === null)
          .map((i) => (i.currentSrc || i.src).slice(0, 140)),
      );
      for (const src of missingAlt) {
        problems.push(`[${vp.name}] ${route} image missing alt: ${src}`);
      }

      /* --- heading order --- */
      const headingIssues = await page.evaluate(() => {
        const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
        const out = [];
        let prev = 0;
        hs.forEach((h) => {
          const lvl = Number(h.tagName[1]);
          if (prev && lvl > prev + 1) {
            out.push(`${h.tagName} after H${prev}: "${h.textContent.trim().slice(0, 50)}"`);
          }
          prev = lvl;
        });
        return out;
      });
      for (const h of headingIssues) {
        problems.push(`[${vp.name}] ${route} heading jump: ${h}`);
      }

      /* --- unlabelled form controls --- */
      const unlabelled = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('input,select,textarea')) {
          if (el.type === 'hidden') continue;
          const id = el.id;
          const hasLabel = id && document.querySelector(`label[for="${CSS.escape(id)}"]`);
          const hasAria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
          if (!hasLabel && !hasAria) out.push(`${el.tagName.toLowerCase()}#${id || '(no id)'}`);
        }
        return out;
      });
      for (const u of unlabelled) {
        problems.push(`[${vp.name}] ${route} unlabelled control: ${u}`);
      }

      /* --- clipped / overlapping text heuristics --- */
      const clipped = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll('h1,h2,h3,h4,p,li,a,button,span,blockquote,dd,dt,label')) {
          /* Skip links are positioned off-screen on purpose; flagging them
             would be reporting the accessibility feature as a defect. */
          if (el.className && String(el.className).includes('skip-link')) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          if (cs.overflow === 'hidden' && cs.textOverflow !== 'ellipsis' && cs.webkitLineClamp === 'none') {
            if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0) {
              out.push(
                `${el.tagName.toLowerCase()} overflow-hidden w/o clamp: "${el.textContent.trim().slice(0, 45)}"`,
              );
            }
          }
          if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX === 'hidden') {
            out.push(
              `${el.tagName.toLowerCase()} x-clipped: "${el.textContent.trim().slice(0, 45)}"`,
            );
          }
        }
        return out.slice(0, 8);
      });
      for (const c of clipped) {
        problems.push(`[${vp.name}] ${route} possibly clipped: ${c}`);
      }

      /* --- collect internal links + console problems --- */
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]'))
          .map((a) => a.getAttribute('href'))
          .filter((h) => h && h.startsWith('/')),
      );
      links.forEach((l) => internalLinks.add(l.split('#')[0].split('?')[0] || '/'));

      for (const e of consoleErrors) {
        /* The 404 probe route is *meant* to 404; its own document 404 is the
           test working, not a defect. */
        if (route.includes('no-such-page')) continue;
        problems.push(`[${vp.name}] ${route} console error: ${e}`);
      }
      for (const e of pageErrors) {
        problems.push(`[${vp.name}] ${route} page error: ${e}`);
      }
      for (const e of failedRequests) {
        if (!/favicon/.test(e)) problems.push(`[${vp.name}] ${route} request failed: ${e}`);
      }

      /* --- screenshot (desktop + mobile only, to keep it manageable) --- */
      if (vp.name !== 'tablet') {
        const name = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '_');
        await page.screenshot({
          path: path.join(SHOTS, `${vp.name}--${name}.png`),
          fullPage: true,
        });
      }
    }

    await ctx.close();
  }

  /* ---------------- link check (same browser, before it closes) ------- */
  console.log('\n=== INTERNAL LINKS ===');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const linkFails = [];
  for (const href of [...internalLinks].sort()) {
    const res = await page.goto(BASE + href, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const st = res ? res.status() : 0;
    if (st >= 400) linkFails.push(`${href} -> ${st}`);
    if (href !== '/') process.stdout.write(st === 200 ? '.' : 'X');
  }
  await ctx.close();
  console.log('');

  await browser.close();

  /* ---------------- report ------------------------------------------- */
  console.log('\n=== ROUTE STATUS ===');
  for (const [r, s] of Object.entries(statusByRoute)) {
    const expect = r.includes('no-such-page') ? 404 : 200;
    console.log(`${s === expect ? 'PASS' : 'FAIL'}  ${String(s).padEnd(4)} ${r}`);
    if (s !== expect) problems.push(`${r} status ${s}, expected ${expect}`);
  }

  const badImages = [...imageRequests.entries()].filter(([, s]) => s >= 400);
  console.log('\n=== IMAGE RESPONSES ===');
  console.log(`${imageRequests.size} image requests, ${badImages.length} with status >= 400`);
  badImages.forEach(([u, s]) => problems.push(`image ${s}: ${u.slice(0, 140)}`));

  console.log('\n=== LINK FAILURES ===');
  console.log(linkFails.length ? linkFails.join('\n') : 'none — all internal links return 200');

  console.log('\n=== PROBLEMS ===');
  if (!problems.length) {
    console.log('none');
  } else {
    const seen = new Set();
    for (const p of problems) {
      if (seen.has(p)) continue;
      seen.add(p);
      console.log(' - ' + p);
    }
    console.log(`\nTOTAL UNIQUE PROBLEMS: ${seen.size}`);
  }
  console.log(`\nScreenshots -> ${SHOTS}`);
})().catch((e) => {
  console.error('HARNESS CRASH:', e);
  process.exit(1);
});