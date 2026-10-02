import type { ReactNode } from 'react';
import { cn } from '@/lib/contact';

/* ------------------------------------------------------------------ *
 * Structural layout primitives
 * ------------------------------------------------------------------ */

export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={cn('mx-auto w-full px-gutter', wide ? 'max-w-[100rem]' : 'max-w-[82.5rem]', className)}>
      {children}
    </div>
  );
}

/**
 * Vertical rhythm for page sections. `edge` controls whether the block is
 * inset on the narrow axis, which is what stops long sections from reading
 * as full-bleed slabs of colour.
 */
export function Section({
  children,
  className,
  tone = 'ivory',
  pad = 'default',
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'ivory' | 'white' | 'navy' | 'navy-deep' | 'wash' | 'ivory-deep';
  pad?: 'default' | 'tight' | 'loose' | 'none';
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    ivory: 'bg-ivory text-ink',
    white: 'bg-white text-ink',
    wash: 'bg-ivory-deep text-ink',
    'ivory-deep': 'bg-ivory-deep text-ink',
    navy: 'bg-navy text-ivory/80 on-navy',
    'navy-deep': 'bg-navy-deep text-ivory/80 on-navy',
  } as const;

  const pads = {
    none: '',
    tight: 'py-14 md:py-20',
    default: 'py-section',
    loose: 'py-20 md:py-32',
  } as const;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], pads[pad], className)}
    >
      {children}
    </section>
  );
}

/** Small uppercase mono label that opens most editorial blocks. */
export function Eyebrow({
  children,
  tone = 'navy',
  className,
}: {
  children: ReactNode;
  tone?: 'navy' | 'ivory' | 'brass';
  className?: string;
}) {
  const tones = {
    navy: 'text-navy/55',
    ivory: 'text-ivory/60',
    brass: 'text-brass',
  } as const;
  return (
    <p className={cn('t-eyebrow flex items-center gap-3', tones[tone], className)}>
      <span aria-hidden="true" className="h-px w-7 bg-brass" />
      {children}
    </p>
  );
}

/** A short editorial heading + optional standfirst, used to open sections. */
export function SectionHead({
  eyebrow,
  title,
  standfirst,
  tone = 'navy',
  align = 'left',
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  standfirst?: ReactNode;
  tone?: 'navy' | 'ivory';
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
}) {
  const titleTone = tone === 'ivory' ? 'text-ivory' : 'text-navy';
  const bodyTone = tone === 'ivory' ? 'text-ivory/70' : 'text-ink-muted';

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        action && 'md:flex-row md:items-end md:justify-between md:gap-12',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <Eyebrow tone={tone} className="mb-6">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2 className={cn('t-h2', titleTone)}>{title}</h2>
        {standfirst ? (
          <p className={cn('t-lead mt-6 max-w-xl', bodyTone)}>{standfirst}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Numbered marker used for the "Why choose us" sequence. */
export function IndexNumeral({ children }: { children: ReactNode }) {
  return (
    <span className="t-meta block text-brass-deep tabular-nums">{children}</span>
  );
}