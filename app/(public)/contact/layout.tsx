import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  contactPageJsonLd,
  faqJsonLd,
} from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Contact — Collector & Gallery Enquiries',
  description:
    'Contact Indian abstract artist Rushit Shah — collector enquiries, gallery submissions, commissions, and studio visits. Every message replied to personally within 48 hours. Studio in Vadodara, Gujarat; shipping worldwide.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: 'https://www.rushitshah.com/contact',
    title: 'Contact Rushit Shah — Collector & Gallery Enquiries',
    description:
      'Collector enquiries, gallery submissions, commissions, studio visits — 48-hour reply guarantee.',
  },
  twitter: {
    title: 'Contact Rushit Shah — Collector & Gallery Enquiries',
    description:
      'Collector enquiries, gallery submissions, commissions, studio visits — 48-hour reply guarantee.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} id="ld-contact-page" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
        id="ld-contact-breadcrumb"
      />
      <JsonLd data={faqJsonLd()} id="ld-contact-faq" />
      {children}
    </>
  );
}
