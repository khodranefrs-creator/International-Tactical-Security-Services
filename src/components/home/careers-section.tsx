import Image from 'next/image';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { careers } from '@/content/copy';

/**
 * Security careers.
 *
 * The contest brief refers to security career training. The live site's only
 * verified material on that is the Security Jobs page: an entry-level posting
 * that states plainly "NO PREVIOUS EXPERIENCE NECESSARY. WE WILL TRAIN YOU."
 *
 * There are no published course names, schedules, certifications, instructors,
 * prices or enrolment guarantees anywhere on the site, so none appear here.
 * The section points to the full posting and to a call, which is the only
 * enquiry path the source supports.
 */
export function CareersSection() {
  return (
    <Section tone="ivory" labelledBy="careers-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="Security careers"
              title={
                <span id="careers-heading">
                  Start a security career. No previous experience necessary.
                </span>
              }
              standfirst="We are hiring professional and reliable security guards in Oregon and Washington. If you have never done this before, we will train you."
            />

            <div className="mt-10 border-y border-rule py-8">
              <p className="t-quote text-[1.375rem] leading-[1.4] text-navy md:text-[1.625rem]">
                {careers.emphasis[0]}
              </p>
              <p className="t-meta mt-5 uppercase tracking-[0.14em] text-brass-deep">
                {careers.emphasis[1]}
              </p>
            </div>

            <p className="mt-8 text-[0.975rem] leading-[1.75] text-ink">
              {careers.intro}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/security-jobs-oregon-washington/" tone="navy" size="md">
                See the full posting <ArrowGlyph />
              </ActionLink>
              <ActionLink href="/contact/" tone="outline" size="md">
                Ask about training
              </ActionLink>
            </div>
          </div>

          <Reveal delay={2} className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/media/services/security-solutions.jpg"
                alt="Group of security officers on duty at a workplace"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <ul className="mt-8 border-t border-rule">
              {careers.responsibilities.slice(0, 3).map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3.5 border-b border-rule py-4 text-[0.9375rem] leading-relaxed text-ink"
                >
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-brass" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}