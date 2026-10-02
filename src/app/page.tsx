import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { CredentialRail } from '@/components/home/credential-rail';
import { ServicesSection } from '@/components/home/services-section';
import { CommercialFeature } from '@/components/home/commercial-feature';
import { EventFeature } from '@/components/home/event-feature';
import { BackSection } from '@/components/home/back-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CareersSection } from '@/components/home/careers-section';
import { ContactConversion } from '@/components/home/contact-conversion';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title:
    'Private Security Services in Portland OR & Vancouver WA | International Tactical Security Services',
  description:
    'Family-owned private security for commercial businesses, retail establishments, banks, events and private individuals across Portland, Oregon and Vancouver, Washington. Armed and unarmed guards, mobile patrol, fire watch and alarm response.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredentialRail />
      <ServicesSection />
      <CommercialFeature />
      <EventFeature />
      <BackSection />
      <TestimonialsSection />
      <CareersSection />
      <ContactConversion />

      {/* Organisation markup limited to facts the site actually publishes.
          No ratings, review counts, opening hours or fabricated identifiers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: site.name,
            url: site.url,
            email: site.email,
            telephone: '+1-503-753-8599',
            description:
              'Family-owned private security company providing armed and unarmed security guards, mobile patrol, fire watch, alarm response and executive protection to commercial businesses, retail establishments, banks and events in the Portland, Oregon and Vancouver, Washington area.',
            areaServed: [
              { '@type': 'City', name: 'Portland', containedInPlace: 'Oregon' },
              { '@type': 'City', name: 'Vancouver', containedInPlace: 'Washington' },
            ],
            address: site.locations.map((loc) => ({
              '@type': 'PostalAddress',
              streetAddress: loc.street,
              addressLocality: loc.city,
              addressRegion: loc.state,
              postalCode: loc.postal,
              addressCountry: 'US',
            })),
            knowsAbout: [
              'Retail security',
              'Bank security',
              'Event security',
              'Mobile patrol',
              'Fire watch',
              'Alarm response',
              'Executive protection',
            ],
          }),
        }}
      />
    </>
  );
}