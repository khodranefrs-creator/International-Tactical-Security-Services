'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/contact';
import type { FaqAnswered } from '@/content/copy';
import { services } from '@/content/services';

/**
 * Accessible disclosure list. Native <details> is the right element here, so
 * this keeps them as real disclosure widgets — keyboard operable and findable by
 * in-page search — while restyling the marker away.
 */
export function FaqList({ items }: { items: FaqAnswered[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <dl className="flex flex-col border-t border-rule">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div key={item.question} id={`faq-${i + 1}`} className="scroll-mt-32 border-b border-rule">
            <dt>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[1.1875rem] font-medium leading-snug text-navy transition-colors group-hover:text-brass-deep md:text-[1.3125rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 grid h-7 w-7 shrink-0 place-items-center border transition-colors',
                    isOpen
                      ? 'rotate-45 border-brass bg-brass/10'
                      : 'border-rule group-hover:border-brass',
                  )}
                >
                  <span className="relative block h-px w-3 bg-navy" />
                  <span className="absolute h-3 w-px bg-navy" />
                </span>
              </button>
            </dt>

            <dd
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-8 pr-10"
            >
              {item.answer.map((para) => (
                <p key={para.slice(0, 24)} className="mb-4 max-w-2xl text-[1rem] leading-[1.75] text-ink last:mb-0">
                  {para === '[contact number]' ? (
                    <Link href="/contact/" className="text-brass-deep underline underline-offset-4">
                      Contact us
                    </Link>
                  ) : item.hasContactNumberToken ? (
                    renderWithPhone(para)
                  ) : (
                    para
                  )}
                </p>
              ))}

              {item.serviceSlugs?.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.serviceSlugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug);
                    if (!s) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${slug}/`}
                          className="t-meta inline-flex items-center gap-2 border border-rule px-3.5 py-2 uppercase tracking-[0.1em] text-navy transition-colors hover:border-brass hover:text-brass-deep"
                        >
                          <span aria-hidden="true" className="h-px w-3 bg-brass" />
                          {s.navLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/** The live FAQ carries a literal "[contact number]" token in one answer. */
function renderWithPhone(text: string) {
  const parts = text.split('[contact number]');
  return parts.map((chunk, i) => (
    <span key={i}>
      {chunk}
      {i < parts.length - 1 ? (
        <a href="tel:+15037538599" className="font-medium text-brass-deep underline underline-offset-4">
          503 753 8599
        </a>
      ) : null}
    </span>
  ));
}