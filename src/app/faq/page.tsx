import type { Metadata } from 'next';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { FaqList } from '@/components/faq-list';
import { faqAnswered, faqUnanswered } from '@/content/copy';
import { primaryPhone } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Private Security Oregon & Washington',
  description:
    'Answers to common questions about our private security services in Portland OR and Vancouver WA — coverage, licensing, guards, alarm response and pricing.',
  alternates: { canonical: '/faq/' },
};

export default function FaqPage() {
  /* JSON-LD is limited to the answered questions; publishing an empty FAQPage
     schema for the three that have no answer would misrepresent the page. */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqAnswered.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer.join(' ').replace(/\[contact number\]/g, primaryPhone.label),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        eyebrow="FAQ"
        title="Questions we get asked most."
        standfirst="If the answer you need is not here, call us. It is a faster way to get an accurate answer than anything we could write down."
      />

      <Section tone="white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky index of questions — helps a long page be scannable */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <p className="t-eyebrow text-brass-deep">On this page</p>
                <ol className="mt-6 flex flex-col gap-3 border-t border-rule pt-6">
                  {faqAnswered.map((f, i) => (
                    <li key={f.question}>
                      <a
                        href={`#faq-${i + 1}`}
                        className="group flex gap-4 text-[0.9375rem] leading-snug text-ink-muted transition-colors hover:text-navy"
                      >
                        <span className="t-meta shrink-0 pt-0.5 text-brass-deep">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="border-b border-transparent pb-1 transition-colors group-hover:border-brass">
                          {f.question}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <FaqList items={faqAnswered} />

              {/* The three questions the live site publishes without answers are
                  reproduced as questions only. No answer has been invented. */}
              {faqUnanswered.length ? (
                <div className="mt-14 border-t border-rule pt-10">
                  <h2 className="t-h3">Also worth asking</h2>
                  <p className="mt-4 text-[0.9375rem] text-ink-muted">
                    These three questions appear on our site without a written answer. Rather than
                    guess, call us and we will answer properly.
                  </p>
                  <ul className="mt-7 flex flex-col gap-3">
                    {faqUnanswered.map((f) => (
                      <li
                        key={f.question}
                        className="flex flex-wrap items-center justify-between gap-4 border border-dashed border-rule px-6 py-5"
                      >
                        <span className="text-[0.9375rem] text-ink">{f.question}</span>
                        <a
                          href={primaryPhone.href}
                          className="t-meta shrink-0 uppercase tracking-[0.12em] text-brass-deep hover:underline"
                        >
                          Ask us
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      <ClosingCta
        heading="Still not sure?"
        body="Ask us about coverage hours, licensing, insurance or what a post actually costs. Straight answers."
      />
    </>
  );
}
