import Image from 'next/image';

/**
 * The company's own logo, used unmodified.
 *
 * The source file is a square shield badge whose artwork fills the canvas
 * (content bounds 591x591 of 600x600, aspect ratio 1.000). Two colourways ship
 * with the site:
 *
 *   dark-on-light  average luminance 66  -> light surfaces
 *   light-on-dark  average luminance 208 -> dark surfaces
 *
 * Neither is recoloured, stretched or re-drawn here. Because the badge
 * contains fine interior detail, it is rendered at a size where the shield
 * silhouette still reads cleanly.
 */

const SIZES = {
  header: { px: 44, className: 'h-9 w-9 md:h-11 md:w-11' },
  footer: { px: 64, className: 'h-14 w-14 md:h-16 md:w-16' },
  card: { px: 72, className: 'h-16 w-16' },
} as const;

export function Logo({
  tone = 'light',
  size = 'header',
  className,
  priority = false,
}: {
  tone?: 'light' | 'dark';
  size?: keyof typeof SIZES;
  className?: string;
  priority?: boolean;
}) {
  const src =
    tone === 'light'
      ? '/media/logo/inta-logo-dark-on-light.webp'
      : '/media/logo/inta-logo-light-on-dark.webp';

  const spec = SIZES[size];

  return (
    <Image
      src={src}
      alt="International Tactical Security Services"
      width={spec.px}
      height={spec.px}
      sizes={`${spec.px}px`}
      priority={priority}
      /* The badge is square (1:1), so an explicit square box cannot distort it.
         `w-auto` is deliberately absent: combined with the global
         `img { max-width: 100% }` it allowed the width to be capped by a
         squeezed flex parent while the height stayed fixed. */
      className={`${spec.className} shrink-0 ${className ?? ''}`}
    />
  );
}