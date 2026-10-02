/**
 * The seven services documented on the live site, mapped one-to-one onto the
 * URLs the site already publishes. Each entry keeps its original slug so no
 * existing search-engine URL is lost.
 *
 * `intro`, `lede`, `points` and `body` are transcribed from the corresponding
 * live page. `points` are the service's own on-page sub-headings.
 */

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  /** Used in the eyebrow of the service's own page. */
  kicker: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  /** Short line for use in listings and the services index. */
  summary: string;
  /** The page's own H1 + standfirst. */
  lede: string;
  /** The page's own headline section copy. */
  intro: string;
  /** Service-specific on-page sections, in original order. */
  body: { heading: string; text: string }[];
  /** Short bullets used on the services index and homepage. */
  highlights: string[];
  audience: string;
}

export const services: Service[] = [
  {
    slug: 'retail-security-guard-service',
    name: 'Retail Security',
    navLabel: 'Retail Security',
    kicker: 'Service 01',
    metaTitle: 'Retail Security Guard Services Portland OR | INTAC',
    metaDescription:
      'Retail security guards in Portland OR and Vancouver WA. Day and night staffing 24/7, armed and unarmed guards, mobile patrols and alarm monitoring for Oregon retailers.',
    image: '/media/services/retail-security.jpg',
    imageAlt:
      'Retail security guard on duty inside a store, monitoring the sales floor',
    summary:
      'Day and night guard coverage for Oregon retailers — in-store protection, mobile patrol and alarm monitoring, armed or unarmed.',
    lede: 'Retail Security Guard Services in Portland OR',
    intro:
      'If you’re looking for a service that provides full protection for retailers, we can help! Protect your shoppers, prevent shoplifting and armed robberies.',
    body: [
      {
        heading: 'Day and night staff on duty 24/7',
        text: 'Our security guards are available for day or night time staffing, which means we can offer you around-the-clock protection all year long – even on holidays! Call us today, and we’ll help you decide the right service plan for your needs.',
      },
      {
        heading: 'Reputable services at an affordable rate',
        text: 'Security isn’t just about having the presence of skilled armed or unarmed security guards on duty – it’s also about getting value for your money. At Security Services of Oregon, our rates are competitive with other local security companies in the market. Call us for a quote today!',
      },
      {
        heading: 'Local Portland Company - Patrolling Your Area',
        text: 'We have patrols all over Portland, so we are able to offer coverage 24/7/365 without fail. Every day of the year, no matter the weather or condition. You can count on us!',
      },
      {
        heading: 'Reputable Protection Service',
        text: 'You’re not just a client, you’re our partner. Our personal-touch approach to service is what sets us apart from our competitors. We’re family owned, and operated by ex-law enforcement officers who want to help make your community a better place to live.',
      },
      {
        heading: 'Affordable Rates that work for you – Budget Friendly',
        text: 'We understand budgets are tight these days and we are committed to partnering with you, to provide the best possible protection, at an affordable rate.',
      },
    ],
    highlights: [
      'In-store protection',
      'Armed and unarmed officers',
      'Mobile security patrol',
      'Alarm monitoring and off-duty law enforcement',
    ],
    audience: 'Retail',
  },
  {
    slug: 'bank-security-guard-service',
    name: 'Bank Security',
    navLabel: 'Bank Security',
    kicker: 'Service 02',
    metaTitle: 'Bank Security Guards Portland OR | INTAC',
    metaDescription:
      'Armed bank security guards in Portland OR. Ex-law enforcement officers trained for robbery, terrorist attack and active shooter scenarios, with de-escalation first.',
    image: '/media/services/bank-security.jpg',
    imageAlt:
      'Armed bank security guard standing at the entrance of a financial institution',
    summary:
      'Armed guards for financial institutions, staffed by ex-law enforcement with decades of experience securing banks.',
    lede: 'Bank Security Guards Services in Portland OR',
    intro:
      'We are Ex-law enforcement with decades of experience securing financial institutions. Our specially trained Armed Bank Security Guards provide a level of protection that is unmatched by any other Portland area security service.',
    body: [
      {
        heading: 'Ex-law enforcement with top training',
        text: 'Bank security guards are experts in a variety of situations, including but not limited to robbery, terrorist attacks, and active shooter scenarios. That doesn’t mean we have a “bully” mentality; our bank security guards are trained to de-escalate and avoid violence if possible.',
      },
      {
        heading: 'You deserve peace of mind',
        text: 'You deserve peace of mind knowing that when you put your trust in us, we’re not just hiring anyone with a security badge. Leverage our decades of experience as professionals in the industry to ensure you’re getting the best protection possible.',
      },
      {
        heading: 'Affordable Protection for your hard earned money',
        text: 'Security Services of Oregon offers affordable protection for your financial institutions in Oregon. We pride ourselves in the ability to make sure that you never have to worry about the bank’s financial assets or the safety of your bank employees or clients.',
      },
      {
        heading: 'A service designed to fit most budgets',
        text: 'Our service is affordable and designed to fit most budgets. Regardless of your budget, we will provide peace of mind with our affordable bank protection services.',
      },
      {
        heading: 'Family Owned - Reputable Services - Portland Based',
        text: 'We take pride in being able to provide affordable protection while maintaining a high level of quality service, that’s reflective of our reputation as a family-owned customer-first company serving Portland and greater Oregon. Every day our security officers help our clients feel more at ease. Our team is friendly, professional, and always ready to help.',
      },
    ],
    highlights: [
      'Armed financial-institution officers',
      'Robbery and active-threat training',
      'De-escalation first',
      'Customer-first, Portland based',
    ],
    audience: 'Financial',
  },
  {
    slug: 'portland-oregon-event-security-service',
    name: 'Event Security',
    navLabel: 'Event Security',
    kicker: 'Service 03',
    metaTitle: 'Event Security Guards Portland OR | INTAC',
    metaDescription:
      'Event security guards in Portland OR and Vancouver WA for corporate events, weddings, festivals and trade shows. Family-owned, affordable, armed and unarmed.',
    image: '/media/services/event-security-wide.jpg',
    imageAlt:
      'Uniformed event security officers working the entrance of a public gathering',
    summary:
      'Licensed event officers for corporate events, weddings, festivals and trade shows — armed and unarmed, planned before doors open.',
    lede: 'Trusted Event Security Services In Portland OR',
    intro:
      'Providing reliable event security guards is a headache for many event planners, but not anymore. Our family-owned and operated company provides affordable protection that you can trust. Save time and money with our services.',
    body: [
      {
        heading: 'Guards who are serious about security',
        text: 'Tired of dealing with guards who don’t take their job seriously? Choose our services to be sure you won’t have to worry about that. Our services include both armed and unarmed guards, and all of them are trained to the highest standards in order to provide the utmost protection.',
      },
      {
        heading: 'Doesn’t cost a fortune',
        text: 'You need an event security service, but you don’t want to break the bank? Don’t worry, we offer your preferred level of protection at an affordable price.',
      },
      {
        heading: 'The best of the best',
        text: 'We offer the finest quality in security guards, as well as top of the line equipment and training. We take pride in our ability to meet the needs of our customers, no matter how big or small.',
      },
      {
        heading: 'A Portland company you can trust',
        text: 'Security Services of Oregon is locally owned and operated. We are a member of the Better Business Bureau, are licensed by the state of Oregon, and carry full general liability insurance coverage.',
      },
      {
        heading: 'Full range of services',
        text: 'We offer a full range of event security services for any type of event – from corporate events to weddings, festivals to trade shows, we’ve got you covered!',
      },
    ],
    highlights: [
      'Corporate events and conferences',
      'Weddings and festivals',
      'Trade shows',
      'Crowd control and traffic flow',
    ],
    audience: 'Events',
  },
  {
    slug: 'mobile-patrol-security',
    name: 'Mobile Patrol',
    navLabel: 'Mobile Patrol',
    kicker: 'Service 04',
    metaTitle: 'Mobile Patrol Security Services Portland OR | INTAC',
    metaDescription:
      'Mobile patrol security in the Portland metro area. Marked vehicle and foot patrols for businesses, homes and apartment complexes, armed and unarmed.',
    image: '/media/hero/security-officer-radio.jpg',
    imageAlt:
      'Security officer holding a two-way radio while conducting a patrol',
    summary:
      'Visible marked and foot patrols across the Portland metro area, armed or unarmed, for businesses, homes and apartment complexes.',
    lede: 'Mobile Patrol Security Services in Portland OR',
    intro:
      'Let our security guards keep you and your assets safe! We have been providing businesses and homes with top-quality security services for the past decade. With a team of highly trained, professional, and courteous security officers, we keep your business, family and assets safe 24/7.',
    body: [
      {
        heading: 'Professional Patrol Services',
        text: 'We provide security solutions for businesses, homes and apartment complexes through our mobile patrol services. Our staff of trusted guards are available to patrol your property anywhere in the Portland or greater Oregon area!',
      },
      {
        heading: 'Family Owned, Reputable Security Guards',
        text: 'Our family-owned business has been providing high-quality protection services for well over a decade. We pride ourselves on our excellent reputation for quality services at affordable prices.',
      },
      {
        heading: 'Affordable Protection for Your Home or Business',
        text: 'We offer prices that are comparable to other companies, with the added benefit of being a family-owned business that is local to Portland.',
      },
      {
        heading: 'Mobile Patrol Services in Portland Area',
        text: 'We operate in all areas of the Portland metro area and have the resources to provide a quick response time to emergencies in any situation.',
      },
      {
        heading: 'Protect your Business and Property',
        text: 'We understand that the safety of your Business and Property is your top priority! You need to know that your private assets are safe and sound at all times. Let us do the job for you and provide protection when regular law enforcement cannot.',
      },
      {
        heading: 'Mobile Patrol Services',
        text: 'It doesn’t matter if it’s after dark or the middle of the night, our mobile patrol services will ensure you have worry-free protection at all times. Our security guards patrol around your property until daybreak, so you can sleep well knowing that your assets are in good hands.',
      },
    ],
    highlights: [
      'Visible deterrent presence',
      'Businesses, homes, apartment complexes',
      'Armed and unarmed officers',
      'Portland metro coverage',
    ],
    audience: 'Commercial',
  },
  {
    slug: 'fire-watch-security-service',
    name: 'Fire Watch',
    navLabel: 'Fire Watch',
    kicker: 'Service 05',
    metaTitle: 'Fire Watch Security Service Portland OR | INTAC',
    metaDescription:
      'Fire watch security in Portland OR. On-site coverage for businesses of all sizes after sprinkler discharge or fire alarm, available 24/7 at competitive rates.',
    image: '/media/services/fire-watch.jpg',
    imageAlt:
      'Female security officer speaking on a phone during an on-site fire watch',
    summary:
      'On-site fire watch coverage for businesses of all sizes, scheduled around your systems and available 24/7.',
    lede: 'Fire Watch Security Service',
    intro:
      'Experience peace of mind knowing that your business is safe and sound. Contact us today to learn more about our fire watch security service.',
    body: [
      {
        heading: 'Founded by ex-law enforcement officers',
        text: 'Founded by ex-law enforcement officers, we have over two decades of experience in the security industry. We’re family-owned and operated, so you can trust that we’ll be professional and diligent about your security needs.',
      },
      {
        heading: 'Affordable Protection for business of all sizes',
        text: 'Our fire watch security service is an affordable option for large companies as well as small businesses, looking to increase their protection. We offer a variety of methods to cater to your needs and budget.',
      },
      {
        heading: 'Portland Oregon based company',
        text: 'We’re proud to be headquartered in the great city of Portland, Oregon! All our employees are neighbors who enjoy living in this fantastic city just like we do!',
      },
      {
        heading: 'A trusted professional by your side',
        text: 'With on-site service, 24/7 coverage and comprehensive security, the team at Security Services of Oregon will be there every step of the way to ensure that you’re fully protected. We would be privileged to have you as a client and provide you with the peace of mind that comes with years of experience in this industry. With us on your side, there will never be another sleepless night!',
      },
    ],
    highlights: [
      'On-site coverage',
      '24/7 availability',
      'Large and small business',
      'Fast response',
    ],
    audience: 'Commercial',
  },
  {
    slug: 'local-alarm-response-service',
    name: 'Alarm Response',
    navLabel: 'Alarm Response',
    kicker: 'Service 06',
    metaTitle: 'Local Alarm Response Service Portland OR | INTAC',
    metaDescription:
      'Local alarm response in the Portland metro area. Family-owned alarm response with local officers en route when your alarm activates, at competitive rates.',
    image: '/media/services/alarm-response.jpg',
    imageAlt: 'Security camera recording footage of a monitored alarm system',
    summary:
      'When an alarm activates, local officers are dispatched. Family-owned, Portland metro based, with packages for different budgets.',
    lede: 'Rapid Alarm System Response Services in Portland OR',
    intro:
      'When seconds count, we’re there for you. We have a professional and efficient alarm response service to make sure that your family and business is safe in any situation.',
    body: [
      {
        heading: 'Family Owned and Operated',
        text: 'Security Services of Oregon is a family owned and operated company which means we care about the security of our clients, their homes, and their businesses. We want the best for our families and we treat our clients like family.',
      },
      {
        heading: 'Affordable Protection',
        text: 'We know that sometimes alarm system response service can be expensive but with us it doesn’t have to be – we offer affordable protection to keep your family safe at home or your business secure. You deserve the best protection at a price that makes sense.',
      },
      {
        heading: 'Reputable Services',
        text: 'Security Services of Oregon is locally owned and operated in Portland, OR which helps us stay connected to the community and provide you with the best service possible.',
      },
      {
        heading: 'What if your Alarm Sounds?',
        text: 'When an alarm activates, Security Service of Oregon Guards are on their way.',
      },
      {
        heading: 'Affordable and Local Protection Company',
        text: 'Security Service of Oregon provides a variety of packages to suit your needs and budget. Since we are located in the Portland Metro Area, we’re never too far away from where you need us.',
      },
      {
        heading: 'Experience you can count on!',
        text: 'Founded by ex-law enforcement officers, we have already helped 100s of individuals and families with affordable protection and reputable security services.',
      },
    ],
    highlights: [
      'Dispatch on alarm activation',
      'Portland metro based',
      'Packages for varied budgets',
      'Family owned',
    ],
    audience: 'Commercial',
  },
  {
    slug: 'dedicated-executive-protection',
    name: 'Executive Protection',
    navLabel: 'Executive Protection',
    kicker: 'Service 07',
    metaTitle: 'Executive Protection Services Portland OR | INTAC',
    metaDescription:
      'Discreet executive protection and close protection in Portland OR. Former law enforcement and military-trained agents for executives, public figures and dignitaries.',
    image: '/media/services/executive-protection.jpg',
    imageAlt: 'Executive protection agent providing discreet close protection',
    summary:
      'Discreet, low-profile close protection for executives, public figures, celebrities and dignitaries — single agent or full detail.',
    lede: 'Professional Executive Protection Services In Portland, OR',
    intro:
      'Protecting high-profile individuals requires more than just a guard at the door — it takes trained professionals who can anticipate risk before it happens. Our family-owned and operated company provides discreet, highly trained executive protection specialists who keep you, your family, and your reputation safe, without disrupting your daily life.',
    body: [
      {
        heading: 'Protection agents trained for high-stakes situations',
        text: 'Worried about hiring protection staff who can’t handle real threats? Our executive protection agents are former law enforcement and military-trained professionals, skilled in close protection, threat assessment, and defensive driving. Every agent is licensed, background-checked, and trained to blend in while staying ready to act.',
      },
      {
        heading: 'Discreet protection, transparent pricing',
        text: 'Executive protection shouldn’t mean flashing lights and obvious security details. We provide low-profile, high-caliber protection tailored to your risk level and budget — whether you need a single agent for a business trip or a full protective detail for extended coverage.',
      },
      {
        heading: 'Secure Your Executive Team In Portland, OR',
        text: 'Security Services of Oregon is a family-owned and operated protection service based in Portland, Oregon. Our executive protection agents are licensed professionals with over 10 years of experience safeguarding corporate executives, public figures, and high-net-worth individuals across the region.',
      },
      {
        heading: 'The best of the best',
        text: 'Our agents undergo continuous training in close protection tactics, emergency medical response, surveillance detection, and secure transportation. We equip every detail with top-tier communication and safety equipment to ensure a seamless, professional presence at all times.',
      },
      {
        heading: 'Full range of protection services',
        text: 'We provide complete executive protection coverage — from corporate travel and residential security to event details and 24/7 close protection — tailored for executives, celebrities, and dignitaries who need reliable, professional security wherever they go.',
      },
    ],
    highlights: [
      'Close protection details',
      'Threat assessment and defensive driving',
      'Corporate travel and residential coverage',
      'Low-profile, discreet presence',
    ],
    audience: 'Individuals',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceHref = (slug: string) => `/${slug}/`;

/**
 * Capability groupings used on the homepage and services index. These are
 * groupings of the seven documented services, not new services.
 */
export const serviceGroups: { title: string; note: string; slugs: string[] }[] = [
  {
    title: 'Commercial & Retail Security',
    note: 'Protecting your premises, your people and your stock.',
    slugs: ['retail-security-guard-service', 'mobile-patrol-security'],
  },
  {
    title: 'Event Security',
    note: 'Organised, professional coverage from load-in to load-out.',
    slugs: ['portland-oregon-event-security-service'],
  },
  {
    title: 'Bank & Financial Security',
    note: 'Armed officers for institutions that cannot afford a gap.',
    slugs: ['bank-security-guard-service'],
  },
  {
    title: 'Fire Watch & Alarm Response',
    note: 'On-site fire watch and local alarm response, around the clock.',
    slugs: ['fire-watch-security-service', 'local-alarm-response-service'],
  },
  {
    title: 'Executive Protection',
    note: 'Discreet close protection for people who need it.',
    slugs: ['dedicated-executive-protection'],
  },
];

