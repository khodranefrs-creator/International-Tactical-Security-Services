/**
 * Testimonials transcribed verbatim from the live homepage. Wording, spelling,
 * capitalisation and attribution are unchanged. Nothing has been added,
 * shortened for tone, or reordered.
 *
 * The live site pairs each testimonial with a decorative "client logo" image.
 * That image is the same black-on-black mark repeated six times across the page
 * and renders as an empty box. It has been deliberately dropped rather than
 * reproduced — see README, "Content decisions".
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** The role line the live site prints under the name, where present. */
  role: string | null;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Nice to work with and responsive. Had them out on a construction site a few hours after I called.',
    name: 'Isaac Cleveland',
    role: null,
  },
  {
    quote:
      'Mark and his team are fantastic. Professional. Detail oriented. Well coordinated. And they work to de-escalate potential problems with calm and confidence. We held a rally in downtown Portland and ANTIFA attempted many times to disrupt the unity event. Mark’s team had every disruptor in sight and didn’t allow ANTIFA’s childish nonsense to impact the unity rally at all. Great work. Great team. Will definitely use their professional services again. Thanks Mark!',
    name: 'Henele E’ale',
    role: null,
  },
  {
    quote:
      'We hired Marks company in less than a week. Not only were they able to respond with short notice but they were professional, engaging, and knew exactly how to manage our event needs. They were flexible as our needs changed some and we felt safe and protected as a result. Highly recommend them for the Portland area and will definitely use them again in the future.',
    name: 'Kathy Small',
    role: 'Client',
  },
  {
    quote:
      'We have a very large event at an amusement park that can bring in about 6,500 people. Knowing who to work with on security that understands our needs and abilities and is flexible to work out a plan - yet does not sacrifice with quality of service is paramount. Having International Tactical Security to work with us as part of our team cannot be undermined. Thank you for helping us address safety and joy for all.',
    name: 'Laila Hajoo',
    role: 'Happy Client',
  },
  {
    quote: 'EXCELLENT PROFESSIONAL SECURITY SERVICE!',
    name: 'MCCP Office of Imam',
    role: 'Happy Client',
  },
];

/**
 * The homepage pull-quote signed by the founder, transcribed verbatim.
 *
 * The live page renders the apostrophe in "We're" as a broken smart-quote
 * artefact ("We' re"). It is normalised to a typographic apostrophe here.
 * The wording itself is unchanged.
 */
export const founderQuote = {
  quote:
    'Every day, we work to keep individuals and businesses safe. Ranging from armed and unarmed patrol, to off-duty law enforcement, firewatch and alarm response services. We’re here to help you protect your business!',
  attribution: 'Mark Richards',
  role: 'CEO & CO Founder',
} as const;

/** Second founder quote from the same page. */
export const founderQuoteSecondary = {
  quote:
    'No one knows security like we do — that’s why we only hire the best in the industry. Our experienced team consists of former SWAT members, military personnel, and law enforcement - all with decades of experience in their field.',
  attribution: 'Mark Richards',
  role: 'CEO & CO Founder',
} as const;