/**
 * Centralised JSON-LD schema factories.
 *
 * Every schema Google / Bing / LLM crawlers see flows through this file so
 * identity facts (name, birth year, city, socials, representation) are
 * maintained in one place. Update here; every page gets it.
 *
 * Schema.org references used:
 *   • Person         https://schema.org/Person        — biographical core
 *   • VisualArtist   https://schema.org/VisualArtist  — extends Person
 *   • WebSite        https://schema.org/WebSite       — site-level search box
 *   • Organization   https://schema.org/Organization  — studio entity
 *   • Event          https://schema.org/Event         — exhibitions
 *   • CollectionPage https://schema.org/CollectionPage — collection index
 *   • ContactPage    https://schema.org/ContactPage   — contact form
 *   • BreadcrumbList https://schema.org/BreadcrumbList — page depth
 */

export const SITE_URL = 'https://www.rushitshah.com';

const portraitUrl = `${SITE_URL}/images/rushit-portrait.png`;

/**
 * The artist himself. We use a union `Person` + `VisualArtist` via
 * @type array so crawlers that only know one still match.
 */
export const personJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': ['Person', 'VisualArtist'],
  '@id': `${SITE_URL}/#person`,
  name: 'Rushit Shah',
  alternateName: ['Rushit', 'Rushit N. Shah'],
  description:
    'Indian abstract artist based in Vadodara, Gujarat. Working between India, Singapore, and Germany. Known for crackle networks, gradient-splatter inversions, and the Fragment + Vyākulatā series.',
  jobTitle: 'Abstract Artist',
  birthDate: '1986-09-08',
  birthPlace: {
    '@type': 'Place',
    name: 'Vadodara, Gujarat, India',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  },
  nationality: {
    '@type': 'Country',
    name: 'India',
  },
  gender: 'Male',
  url: SITE_URL,
  image: portraitUrl,
  email: 'mailto:rs@rushitshah.com',
  knowsLanguage: ['English', 'Hindi', 'Gujarati'],
  knowsAbout: [
    'Abstract painting',
    'Contemporary Indian art',
    'Crackle network technique',
    'Gradient splatter',
    'Colour theory',
    'Eastern miniature painting',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      addressLocality: 'Singapore',
      addressCountry: 'SG',
    },
    {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Rushit Shah Studio',
    url: SITE_URL,
  },
  affiliation: {
    '@type': 'Organization',
    name: 'Maio Studio',
    description: 'Representing gallery, Singapore',
  },
  sameAs: [
    'https://instagram.com/rushitshah08',
    'https://www.linkedin.com/in/rushitshah',
    'https://www.artworkarchive.com/profile/rushitshah',
  ],
};

/**
 * WebSite entity with a sameAs link to the Person so crawlers join the two.
 * potentialAction makes the site eligible for Google's sitelinks search box.
 */
export const websiteJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Rushit Shah — Abstract Artist',
  alternateName: 'Rushit Shah Portfolio',
  description:
    'Official portfolio of Indian abstract artist Rushit Shah — original paintings, exhibition archive, and collector enquiries.',
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
  author: { '@id': `${SITE_URL}/#person` },
  copyrightHolder: { '@id': `${SITE_URL}/#person` },
  copyrightYear: 2026,
};

/**
 * The studio as a separate entity (helps with "Rushit Shah Studio" searches
 * and gives the Person a plausible worksFor target).
 */
export const organizationJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#studio`,
  name: 'Rushit Shah Studio',
  legalName: 'Rushit Shah Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: portraitUrl,
  founder: { '@id': `${SITE_URL}/#person` },
  foundingDate: '2018',
  foundingLocation: {
    '@type': 'Place',
    name: 'Vadodara, Gujarat, India',
  },
  email: 'rs@rushitshah.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  areaServed: ['IN', 'SG', 'DE', 'Worldwide'],
  sameAs: [
    'https://instagram.com/rushitshah08',
    'https://www.artworkarchive.com/profile/rushitshah',
  ],
};

/* ─────────────────────────────────────────────────────────────
 * Per-page schemas — kept as factories so they can stamp in data
 * from the page body if needed.
 * ───────────────────────────────────────────────────────────── */

export function breadcrumbJsonLd(
  trail: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`,
    })),
  };
}

export function contactPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact#page`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Rushit Shah',
    description:
      'Collector enquiries, gallery submissions, studio visits. Rushit replies within 48 hours.',
    mainEntity: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

export function collectionPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/collection#page`,
    url: `${SITE_URL}/collection`,
    name: 'The full folio — Collection',
    headline: 'The full folio — every available abstract painting',
    description:
      'Every available original abstract painting by Rushit Shah. Browse, enquire, and purchase. Shipping worldwide from Vadodara, India.',
    about: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
    creator: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
    // Offer catalog signal — tells search engines this page sells original art.
    offers: {
      '@type': 'AggregateOffer',
      offeredBy: { '@id': `${SITE_URL}/#person` },
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      businessFunction: 'https://schema.org/Sell',
      itemCondition: 'https://schema.org/NewCondition',
      areaServed: 'Worldwide',
      eligibleRegion: { '@type': 'Place', name: 'Worldwide' },
      description:
        'Original abstract paintings for sale — enquire for pricing, shipping, and availability.',
    },
  };
}

export type ExhibitionSeed = {
  title: string;
  startDate: string; // ISO
  venue: string;
  city: string;
  country: string;
  type: 'Solo' | 'Group';
};

export function exhibitionEventsJsonLd(
  shows: ExhibitionSeed[],
): Record<string, unknown>[] {
  return shows.map((s, i) => ({
    '@context': 'https://schema.org',
    '@type': 'ExhibitionEvent',
    '@id': `${SITE_URL}/exhibitions#show-${i}`,
    name: `${s.title} — ${s.type} exhibition featuring Rushit Shah`,
    startDate: s.startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: s.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: s.city,
        addressCountry: s.country,
      },
    },
    performer: { '@id': `${SITE_URL}/#person` },
    organizer: {
      '@type': 'Organization',
      name: s.venue,
    },
    description: `${s.type} exhibition featuring the work of abstract artist Rushit Shah at ${s.venue}, ${s.city}.`,
  }));
}

export function aboutPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/artist#page`,
    url: `${SITE_URL}/artist`,
    name: 'About — Rushit Shah, Abstract Artist',
    headline: 'I paint in layers, then argue.',
    description:
      'Biography of abstract artist Rushit Shah — colourblind Indian painter born 1986 in Vadodara, working between India, Singapore, and Germany.',
    mainEntity: { '@id': `${SITE_URL}/#person` },
    about: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en',
  };
}

/**
 * FAQ page schema — great for long-tail LLM queries like "is Rushit Shah
 * available for commissions" or "where does Rushit Shah ship". Google also
 * shows these in SERPs.
 */
export function faqJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Rushit Shah?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rushit Shah is an Indian abstract artist born in Vadodara, Gujarat in 1986. He works between India, Singapore, and Germany, and is represented by Maio Studio in Singapore. His practice is known for crackle-network paintings, gradient-splatter inversions, and the Fragment and Vyākulatā series.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Rushit Shah based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'His studio is in Vadodara, Gujarat, India. He also spends time working in Singapore and Düsseldorf, Germany.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I buy an original Rushit Shah painting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browse the live Collection page to see every available work. Pricing, shipping, and commission enquiries are handled personally via rs@rushitshah.com — typical reply within 48 hours. Worldwide shipping.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Rushit Shah take commissions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Collectors and interior designers can commission bespoke abstract works — contact rs@rushitshah.com with brief, scale, and destination.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a "crackle network" painting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A signature Rushit Shah technique — a dense, branching web of fissures that forms across a painted surface and is then treated as a drawing. The cracks map like neural networks, riverbeds, or cracked glaze on old ceramics.',
        },
      },
    ],
  };
}
