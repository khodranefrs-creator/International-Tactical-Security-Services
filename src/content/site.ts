/**
 * Verified company identity and contact details.
 *
 * Every value here was transcribed from the live site at
 * https://internationaltacticalsecurity.com/ (homepage, contact page and the
 * footer, which is identical across every page).
 *
 * NOTE ON PHONE NUMBERS: the live site carries two numbers and does not state
 * which is authoritative. Both are preserved and both are presented to
 * visitors. `primary` is the number used in every call-to-action, because that
 * is the number the site itself uses for its "Call us today" prompts
 * (503-753-8599). This is a presentation choice, not a correction.
 */

export const site = {
  name: 'International Tactical Security Services',
  shortName: 'INTAC',
  url: 'https://internationaltacticalsecurity.com',
  legalName: 'International Tactical Security Services',

  email: 'info@internationaltacticalsecurity.com',

  phones: [
    {
      label: '503 753 8599',
      href: 'tel:+15037538599',
      role: 'Primary line — used for all call to actions',
    },
    {
      label: '877 468 2206',
      href: 'tel:+18774682206',
      role: 'Toll-free line',
    },
  ] as const,

  /**
   * Both addresses appear in the site footer on every page. They are kept
   * exactly as published, including the map links used there.
   */
  locations: [
    {
      city: 'Vancouver',
      state: 'WA',
      postal: '98662',
      street: '4317 NE Thurston Way #150',
      region: 'Vancouver, Washington',
      mapHref: 'https://maps.app.goo.gl/8AnGcQeR7Y2Bcmpw7',
    },
    {
      city: 'Portland',
      state: 'OR',
      postal: '97217',
      street: '26 N Lombard',
      region: 'Portland, Oregon',
      mapHref: 'https://goo.gl/maps/SMZhwHPJ3mABoWFNA',
    },
  ] as const,

  /** Service area as stated on the live site: "the Portland and Vancouver area". */
  serviceArea: 'Portland, Oregon and Vancouver, Washington',

  /** Verbatim claim used as the homepage experience figure, in source context. */
  combinedExperience: '32+',
  combinedExperienceLabel: 'Years of Combined Security Experience',

  founded: '2005',
  founderStartedInLawEnforcement: '1994',
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Only the Services entry opens a submenu. */
  hasMenu?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/', hasMenu: true },
  { label: 'About', href: '/about-us/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Careers', href: '/security-jobs-oregon-washington/' },
  { label: 'Contact', href: '/contact/' },
];

export const primaryCta = {
  label: 'Request Security Services',
  href: '/contact/',
} as const;

export const inquiryTypes = [
  { value: 'retail', label: 'Retail or Business Security' },
  { value: 'bank', label: 'Bank Security' },
  { value: 'event', label: 'Event Security' },
  { value: 'mobile-patrol', label: 'Mobile Patrol' },
  { value: 'alarm-response', label: 'Alarm Response' },
  { value: 'firewatch', label: 'Firewatch' },
  { value: 'bodyguard', label: 'Bodyguard' },
] as const;

/** Verbatim feature list repeated across the live service pages. */
export const sharedServicePoints = [
  'Retail Security Teams',
  'Mobile Security Patrols',
  'Highly Trained Professionals',
  'Experience you can count on',
  'Armed and Unarmed Security Guards',
  'Firewatch Security Services',
] as const;