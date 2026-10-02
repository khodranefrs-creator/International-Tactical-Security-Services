# International Tactical Security Services

Redesign of the public website for International Tactical Security Services
(INTAC), a family-owned private security company operating in Portland, Oregon
and Vancouver, Washington.

Built with Next.js App Router, TypeScript and Tailwind CSS v4.

## What is in here

The site's content was transcribed from the live WordPress site rather than
invented. Every service description, testimonial, FAQ answer, blog article and
contact detail comes from the source, including the places where the source
disagrees with itself:

- The site carries both **32+**, **over 27 years**, **over 30 years** and
  **since 2005**. Each is preserved where it was published rather than being
  quietly harmonised into one number.
- Two phone numbers are published (`503-753-8599` and `877-468-2206`) and the
  live site does not say which is authoritative. Both are shown. The first is
  used for call-to-action buttons because that is the number the site itself
  uses for its "call us today" prompts.
- Three FAQ questions are published on the live site with no answer. They are
  reproduced as questions, with no invented answer and no `FAQPage` schema
  entry for them.
- No article on the live site exposes a publication date, so none is shown and
  none is put in structured data.

These are recorded in `src/content/*.ts` and in the comments of those files.

## Routes

| Path | Source |
| --- | --- |
| `/` | new composition of the live homepage content |
| `/services/` | **new** index of the seven services |
| `/retail-security-guard-service/` | live route, preserved |
| `/bank-security-guard-service/` | live route, preserved |
| `/portland-oregon-event-security-service/` | live route, preserved |
| `/mobile-patrol-security/` | live route, preserved |
| `/fire-watch-security-service/` | live route, preserved |
| `/local-alarm-response-service/` | live route, preserved |
| `/dedicated-executive-protection/` | live route, preserved |
| `/about-us/` | live route, preserved |
| `/faq/` | live route, preserved |
| `/contact/` | live route, preserved |
| `/blog/` | live route, preserved; all 13 articles listed |
| `/blog/page/2/` | live pagination URL, preserved |
| `/blog/[slug]/` | 13 articles, statically generated |
| `/security-jobs-oregon-washington/` | live route, preserved |
| `/sitemap/` | live route, preserved |
| `/robots.txt`, `/sitemap.xml` | generated |

Trailing slashes are preserved on every published URL.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build
npm start
```

## Contact form

The site does not send email itself. `/api/contact` validates the submission
(including a hidden-field spam check) and forwards it as JSON to an endpoint you
configure:

```bash
cp .env.example .env.local
# set CONTACT_WEBHOOK_URL to an HTTPS endpoint that accepts a JSON POST
# set CONTACT_WEBHOOK_TOKEN if your endpoint wants a bearer token
```

**Until `CONTACT_WEBHOOK_URL` is set the form does not pretend to work.** It
returns a `503` with a clear message and shows the phone number and email
address, because a form that claims success while silently discarding the
submission is worse than no form.

## Images

All 37 images are the client's own, downloaded from the live site and stored in
`public/media/`. Two things are worth knowing:

- The live site serves **WebP bytes under `.jpg` and `.png` filenames**. The
  files here have been renamed to match their real format, because Next's image
  optimizer refuses to decode a file whose extension contradicts its content.
  `npm run fix:assets` (see `fix-assets.js`) did this and rewrote the
  references.
- No image is recoloured, stretched or re-drawn. The logo ships in two
  colourways and is used on the surface each was made for.

## Checks

```bash
npm run verify          # typecheck + lint + build + asset/token checks
npm run verify:media    # every /media reference resolves to a real file
npm run verify:tokens   # every colour class used is actually declared
```

Two browser checks need a running server and a locally installed Chrome or
Edge:

```bash
npm run build && npm start -- --port 3210
npm run verify:reveal   # no section left invisible; every image loads
npm run verify:layout   # overflow, console errors, headings, labels, links
```

`verify:layout` also writes full-page screenshots to `.verify/` at 1440, 834 and
390 px wide for human review. It drives your installed Chrome through
Playwright's `channel` option and needs no separate browser download.

## Deployment

`next build` prerenders 33 of the 34 routes. Only `/api/contact` is dynamic. The
image optimizer needs `sharp`, which is a runtime dependency here.

Deploy to any Next.js host. Set the two environment variables above, and update
`site.url` in `src/content/site.ts` if the domain changes, since it feeds
canonical URLs, `sitemap.xml` and `robots.txt`.

## Not done, deliberately

- No client logo redesign or invented marks.
- No stock photography substituted for the client's own.
- No analytics or tracking of any kind.
- No answers invented for the three unanswered FAQ questions.
- No publication dates invented for the 13 articles.