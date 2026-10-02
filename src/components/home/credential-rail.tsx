import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { site } from '@/content/site';

/**
 * Credential rail. Four concise factual statements drawn from the live site.
 *
 * Deliberately NOT a statistics strip: the only number anywhere on the current
 * website is the "32+ years of combined security experience" figure, and that
 * appears further down the page in its own source context. No client count,
 * officer count, incident figure or contract count has been invented here.
 */
const credentials = [
  {
    label: 'Family-owned',
    text: 'Family-owned and operated. You’ll never feel like we’re just “the other guy” in your phone book.',
  },
  {
    label: 'Licensed',
    text: 'Licensed in Oregon and Washington. We know the law and how to stay within it.',
  },
  {
    label: 'Personnel',
    text: 'Former police officers, military veterans and SWAT members, with rigorous training.',
  },
  {
    label: 'Coverage',
    text: `Serving commercial clients throughout the ${site.serviceArea}.`,
  },
];

export function CredentialRail() {
  return (
    <Section tone="ivory" pad="tight">
      <div className="shell">
        <ul className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c, i) => (
            <Reveal
              as="li"
              key={c.label}
              delay={i as 0 | 1 | 2 | 3}
              className="border-b border-rule py-8 sm:py-9 sm:pr-6 lg:pr-6 lg:first:pl-0 lg:not-first:border-l lg:not-first:pl-6"
            >
              <p className="t-eyebrow text-navy/45">{c.label}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{c.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}