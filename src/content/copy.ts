/**
 * FAQ transcribed from https://internationaltacticalsecurity.com/faq/
 *
 * Two source quirks are handled explicitly rather than silently:
 *
 * 1. The answer to "How can I request security guard services from your company?"
 *    contains a literal, unfilled "[contact number]" placeholder. The sentence
 *    is otherwise preserved. In this implementation that placeholder is rendered
 *    as a real tel: link to the company's verified primary number. See the
 *    `contactNumberToken` field.
 *
 * 2. Three questions are published on the live page with NO answer at all. They
 *    are grouped under `unanswered` and surfaced in the UI as open questions
 *    with a prompt to contact the company. No answers have been written for
 *    them.
 */

export interface FaqAnswered {
  question: string;
  /** Paragraphs of the original answer, in order. */
  answer: string[];
  /** Set when the answer contains an internal service link. */
  serviceSlugs?: string[];
  /** True when the answer contains the literal "[contact number]" placeholder. */
  hasContactNumberToken?: boolean;
}

export interface FaqUnanswered {
  question: string;
}

export const faqAnswered: FaqAnswered[] = [
  {
    question: 'What services does the company offer?',
    answer: [
      'At Security Services of Oregon, your security is our business! We offer a comprehensive range of security services, including Alarm Responsive Service, Event Security Service, Retail Security Service, Mobile Patrol Service, Bank Security Service, and Fire Watch Service.',
    ],
    serviceSlugs: [
      'local-alarm-response-service',
      'portland-oregon-event-security-service',
      'retail-security-guard-service',
      'mobile-patrol-security',
      'bank-security-guard-service',
      'fire-watch-security-service',
    ],
  },
  {
    question: "What is the company's experience and reputation?",
    answer: [
      'We are a family-owned and operated private security service and have over 32 years of experience and expertise in protecting businesses and property in Portland, OR and the surrounding areas. When it comes to cost-effective, reliable, and professional solutions, businesses and retailers count on us to be there!',
    ],
  },
  {
    question: "What is the security guard's training and experience?",
    answer: [
      'Every one of our security guards is highly trained and qualified in all aspects of private law enforcement. In any given situation, we first use proven de-escalation methods to minimize risk to the business and the public.',
    ],
  },
  {
    question:
      "What is the security guard's plan for handling crowds and managing traffic flow?",
    answer: [
      'Our security guards are highly trained and skilled in utilizing advanced crowd control techniques to effectively handle crowds and manage traffic flow.',
    ],
  },
  {
    question: 'How do you ensure the professionalism of your security guards?',
    answer: [
      'We’re grateful for your question! Maintaining professionalism is of utmost importance to us. Our security guards are carefully selected based on their experience, skills, and professionalism.',
    ],
  },
  {
    question: 'How can I request security guard services from your company?',
    answer: [
      'We appreciate your inquiry! Requesting security guard services is simple and convenient. You can reach out to us through our website or give us a call at [contact number]. Our friendly staff will assist you in understanding your security needs and guide you through the process of hiring our professional security guards. We look forward to providing you with top-notch security services.',
    ],
    hasContactNumberToken: true,
  },
  {
    question:
      'Can event security guards assist with event planning and risk assessment?',
    answer: [
      'Yes, event security guards can assist with event planning and risk assessment. They bring valuable expertise to the table, helping event organizers identify potential security vulnerabilities and develop strategies to mitigate risks. By collaborating with our clients during the planning stages, we ensure that comprehensive security measures are in place, contributing to a successful and secure event.',
    ],
  },
  {
    question: 'What are the benefits of mobile patrol security?',
    answer: [
      'Mobile patrol security offers several benefits. First, it provides a visible security presence, deterring potential criminals and reducing the risk of incidents. Second, the mobile patrols can quickly respond to alarms or suspicious activities, minimizing response times.',
    ],
  },
];

/**
 * Published on the live FAQ page as bullet questions with no accompanying
 * answer. Reproduced as-is, with no invented response.
 */
export const faqUnanswered: FaqUnanswered[] = [
  { question: 'What is the security guard’s plan for dealing with prohibited items or behaviors?' },
  { question: 'What is the security guard’s background check process?' },
  { question: 'What are the costs and terms of the service contract?' },
];

/**
 * The "Why Choose Us" block from the homepage, verbatim including numbering.
 */
export const reasons = [
  {
    number: '01',
    heading: 'Licensed in Oregon and Washington',
    text: 'We know the law AND how to stay within it, to protect your security and peace of mind.',
  },
  {
    number: '02',
    heading: 'Former Police and Military Professionals',
    text: 'Highly skilled and experienced individuals with exposure to a variety of security scenarios. Able to quickly de-escalate volatile situations to mitigate risk.',
  },
  {
    number: '03',
    heading: 'Affordable Protection',
    text: 'You don’t have to break the bank to have a reliable security service protecting you or your business. Our services are affordable for all budgets - give us a call today, lets talk !',
  },
  {
    number: '04',
    heading: 'Terrific Customer Service',
    text: 'Family owned and operated. We are always there for you and happy to take care of any emergency you may have.',
  },
] as const;

/** The bulleted value list that appears under "We go the extra mile…" */
export const valuePoints = [
  '24/7 protection',
  'Highly Trained Professionals',
  'Security Risk De-Escalation',
  'Safety at all levels',
  'Family-Owned',
  'Affordable Protection',
] as const;

/** The "A Security Team you Can Trust" block from the homepage, verbatim. */
export const pillars = [
  {
    title: 'A security team you can depend on',
    text: 'No matter if you’re a retail business looking to hire private guards, a commercial business with event security needs, or a large establishment that needs bank security, our expert security staff will provide the peace of mind you deserve.',
  },
  {
    title: 'We offer it all',
    text: 'With over 30 years of experience in protecting businesses and their assets, we provide a wide range of services. From alarms and video surveillance to retail guards and bank security guards, we have the right solution for your needs.',
  },
  {
    title: 'We’re proud to be family owned',
    text: 'You’ll never feel like we’re just “the other guy” in your phone book. We’re family-owned and operated and pride ourselves on never sacrificing quality for profit.',
  },
  {
    title: 'Affordable protection',
    text: 'At Security Services of Oregon, we offer competitive rates with affordable monthly packages that are tailored to fit your business’s needs.',
  },
  {
    title: 'We’re always by your side',
    text: 'We’re there for you from beginning to end. We provide a highly responsive team that will work hard to maintain a high level of security for the duration of the engagement.',
  },
  {
    title: 'Staying true to our word',
    text: 'We are committed to being honest, dependable, and trustworthy with every customer we serve. That’s why we offer peace of mind with our security services and why we have been in business since 2005.',
  },
] as const;

/**
 * "Professional Security Services in Oregon and Washington" — homepage copy,
 * transcribed including the 27-year figure exactly as published there.
 */
export const overview = {
  heading: 'Professional Security Services in Oregon and Washington',
  paragraphs: [
    'Providing security for your commercial business in the Portland and Vancouver, Washington area has never been more challenging these days. At International Tactical Security Services, we offer over 27 years of experience and expertise in protecting people and property. We offer the best trained security service in the Portland, OR, area, with many of our security guards former police officers or military veterans. All our professional guards go through rigorous training, ensuring they have the skills and knowledge to manage any security concern that may arise.',
    'International Tactical Security Services provides a wide range of services for companies, organizations, events, and individuals in the area. This includes retail, bank, corporate, and event security services, all customized to the needs of our clients. Count on our security company for mobile patrol security needs, fire watch services for businesses, and alarm response services that are rapid and effective. Our private security company provides around-the-clock protection with our executive protection, alarmed guards to keep public figures, visiting dignitaries and guests, or celebrities safe throughout the area.',
    'Let us assist your in-house security or your management team in creating an effective emergency response plan, evaluate your business for potential security vulnerabilities, and implement a security strategy to keep everyone safe. International Tactical Security Services offers both armed and unarmed guards throughout the area, ensuring the level of security you require is always in place. For peace of mind, call on the experts at International Tactical Security Services. For more information, call us today at 503-753-8599',
  ],
} as const;

/** The "We go the extra mile…" block from the homepage, verbatim. */
export const aboutBlock = {
  heading: 'We go the extra mile…',
  paragraphs: [
    'We are a family-owned and operated private security service located in the Portland and Vancouver area. We offer a variety of security services for commercial businesses. As your private security provider, we take every measure possible to ensure that your security is prioritized.',
    'From working with local law enforcement agencies to having an emergency response plan in place, we’re always looking for ways to improve our level of service. We provide our clients with mobile patrols that act as a deterrent to crime. Our patrols are highly trained and qualified in all aspects of law enforcement so you can rest assured knowing your premises are safe. We provide 24/7 protection for your business so you never have to worry about safety again!',
  ],
} as const;

/** About page founder bio, verbatim including the 1994 / 32-year wording. */
export const founder = {
  name: 'Mark Richards',
  role: 'CEO & CO Founder',
  heading: '32 Years of Experience',
  paragraphs: [
    'Mark started a career in Law enforcement 1994 and brings over 32 years of experience supporting organizational efforts in uniquely challenging locations. Dedicated to strategic planning and delivery of large-scale objectives, while maintaining highest levels of integrity and respect. Adept at facilitating attainment of complex goals in environments ranging from a third-world civil-war-torn country. Highly skilled in utilizing advanced technical, business and logistics prowess to streamline processes.',
  ],
  points: [
    'Former Law Enforcement',
    'Armed and UnArmed',
    'Highly Trained Professionals',
    'Safety at all Levels',
    'Affordable Protection',
    'Family Owned',
  ],
} as const;

/** Careers page, transcribed from /security-jobs-oregon-washington/. */
export const careers = {
  heading: 'NOW HIRING SECURITY GUARDS - NO EXPERIENCE NEEDED',
  location: 'Location: Oregon and Washington',
  intro:
    'We are seeking professional and reliable security guards to join our team. You will be responsible for ensuring the safety and security of our client’s facilities, customers, employees, and visitors.',
  emphasis: [
    'NO PREVIOUS EXPERIENCE NECESSARY. WE WILL TRAIN YOU.',
    'VERY COMPETITIVE PAY !! $$$$$',
  ],
  responsibilitiesHeading: 'Responsibilities:',
  responsibilities: [
    'Patrol the facility to ensure safety and security',
    'Monitor security cameras and respond to any security breaches or incidents',
    'Respond to emergency situations and provide aid as needed',
    'Write incident reports and maintain accurate records',
    'Perform tasks such as unlocking doors and assisting customers, employees and visitors',
  ],
  qualificationsHeading: 'Qualifications:',
  qualifications: [
    'High school diploma or equivalent',
    'Excellent communication and customer service skills',
    'Ability to remain calm and level-headed in emergency situations',
    'Physical ability to stand for long periods of time and perform tasks such as lifting and carrying equipment',
  ],
  closing:
    'We offer competitive pay and benefits, as well as opportunities for growth and advancement within the company. If you are interested in joining our team as a security guard, please submit your resume and cover letter for consideration or just call us to enquire about this exciting high growth field.',
} as const;