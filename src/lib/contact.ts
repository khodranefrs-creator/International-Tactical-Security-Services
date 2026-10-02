/**
 * Joins conditional class names. Accepts unknown so callers can pass
 * expressions such as `i === 0 && 'class'` without type gymnastics.
 */
export function cn(...parts: unknown[]) {
  return parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');
}

export const primaryPhone = {
  label: '503 753 8599',
  href: 'tel:+15037538599',
};

export const tollFreePhone = {
  label: '877 468 2206',
  href: 'tel:+18774682206',
};

export const email = 'info@internationaltacticalsecurity.com';
export const mailtoHref = `mailto:${email}`;