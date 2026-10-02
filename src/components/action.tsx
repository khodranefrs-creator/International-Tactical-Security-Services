import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/contact';

/* ------------------------------------------------------------------ *
 * Button / link primitives.
 * One visual language across primary, secondary and quiet treatments,
 * on both light and navy surfaces.
 * ------------------------------------------------------------------ */

const base =
  'inline-flex items-center justify-center gap-2.5 font-sans text-[0.8125rem] font-medium tracking-[0.13em] uppercase leading-none transition-colors duration-200 select-none';

const sizes = {
  md: 'px-6 py-[0.9375rem]',
  lg: 'px-7 py-4 md:px-9 md:py-[1.1875rem]',
  sm: 'px-4 py-2.5',
} as const;

const tones = {
  /* Brass fill — the single strongest action on the page */
  brass:
    'bg-brass text-navy-deep hover:bg-[#d3b681] active:bg-brass-deep border border-brass hover:border-[#d3b681]',
  navy: 'bg-navy text-ivory hover:bg-navy-lift active:bg-navy-deep border border-navy hover:border-navy-lift',
  outline:
    'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-ivory',
  'outline-light':
    'border border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-navy',
  ghost: 'text-navy hover:text-brass-deep',
} as const;

export type ButtonTone = keyof typeof tones;
export type ButtonSize = keyof typeof sizes;

function classes(tone: ButtonTone, size: ButtonSize, full: boolean, className?: string) {
  return cn(base, sizes[size], tones[tone], full && 'w-full', className);
}

type ActionProps = {
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
};

export function ActionLink({
  href,
  children,
  tone = 'navy',
  size = 'md',
  full = false,
  className,
  ...rest
}: ActionProps & { href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  if (external) {
    return (
      <a href={href} className={classes(tone, size, full, className)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(tone, size, full, className)} {...rest}>
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  tone = 'navy',
  size = 'md',
  full = false,
  className,
  ...rest
}: ActionProps & ComponentProps<'button'>) {
  return (
    <button className={classes(tone, size, full, className)} {...rest}>
      {children}
    </button>
  );
}

/** Inline arrow that nudges on hover — the only motion on buttons. */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 10"
      className={cn('h-[9px] w-[15px] shrink-0', className)}
      fill="none"
    >
      <path
        d="M0 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}