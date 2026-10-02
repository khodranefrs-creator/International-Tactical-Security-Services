'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/contact';

/**
 * Small viewport-triggered entrance.
 *
 * The element ships fully visible and unanimated, so it is readable with
 * JavaScript disabled and before hydration. Only once the client has confirmed
 * the element is genuinely off-screen does it mark itself pending and wait for
 * the observer. That ordering means there is no flash of invisible content and
 * no dependency on JavaScript for legibility.
 *
 * The reveal state lives on the DOM node as `data-reveal` rather than in React
 * state: it is purely a styling concern, and writing it directly means the
 * effect never triggers a re-render of its own subtree.
 *
 * `prefers-reduced-motion` short-circuits before any observation happens.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: 'div' | 'li' | 'section' | 'article';
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.dataset.reveal = 'in';
      return;
    }

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) {
      el.dataset.reveal = 'in';
      return;
    }

    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (el as HTMLElement).dataset.reveal = 'in';
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={delay ? { animationDelay: `${delay * 0.07}s` } : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  );
}