import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { site } from '@/content/site';

/**
 * Typography: an editorial serif for messaging, a neutral sans for interface
 * and body copy, and a mono for labels and operational metadata. The mono is
 * what gives the "field operations" character its precise, instrument-like
 * edge without resorting to effects.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Private Security Services in Portland OR & Vancouver WA | International Tactical Security Services',
    template: '%s | International Tactical Security Services',
  },
  description:
    'Family-owned private security for commercial businesses, retail, banks and events across Portland, Oregon and Vancouver, Washington. Armed and unarmed guards, mobile patrol, fire watch and alarm response.',
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'security guards Portland Oregon',
    'private security Portland OR',
    'retail security guards',
    'bank security guards Oregon',
    'event security Portland',
    'mobile patrol security',
    'fire watch Oregon',
    'alarm response Portland',
    'executive protection Portland',
    'security Vancouver Washington',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: 'Private Security Services in Portland OR & Vancouver WA',
    description:
      'Family-owned private security for commercial businesses, retail, banks and events across Portland, Oregon and Vancouver, Washington.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Security Services in Portland OR & Vancouver WA',
    description:
      'Family-owned private security for commercial businesses, retail, banks and events across Portland, Oregon and Vancouver, Washington.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'business/security',
};

export const viewport: Viewport = {
  themeColor: '#101f2b',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="skip-link t-meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-navy focus:px-5 focus:py-3 focus:uppercase focus:tracking-[0.13em] focus:text-ivory"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}