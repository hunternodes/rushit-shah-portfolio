import type { Payload } from 'payload';
import { lex, lexMixed, lexParas } from './lexical';

/**
 * Idempotent seed. Runs on every boot via payload.config.ts onInit,
 * but exits early if seed has already run (via `siteCopy.seeded` flag).
 */
export async function seed(payload: Payload): Promise<void> {
  // 1. Auto-create the admin user from env vars if none exists (dev convenience).
  const userCount = await payload.count({ collection: 'users' });
  if (userCount.totalDocs === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'rushit@local.dev';
    const password = process.env.SEED_ADMIN_PASSWORD || 'changeme123';
    payload.logger.info(`Seed: creating admin user ${email}...`);
    await payload.create({
      collection: 'users',
      data: { email, password },
    });
    payload.logger.info('Seed: admin user created.');
  }

  // 2. Check if siteCopy has been seeded
  const siteCopy = await payload.findGlobal({ slug: 'site-copy' });
  if (siteCopy?.seeded) {
    payload.logger.info('Seed: siteCopy already seeded, skipping.');
  } else {
    payload.logger.info('Seed: populating siteCopy global...');
    await seedSiteCopy(payload);
    payload.logger.info('Seed: siteCopy done.');
  }

  // 3. Seed Fragment paintings only if collection is empty
  const paintingCount = await payload.count({ collection: 'paintings' });
  if (paintingCount.totalDocs === 0) {
    payload.logger.info('Seed: populating paintings collection...');
    await seedPaintings(payload);
    payload.logger.info('Seed: paintings done.');
  } else {
    payload.logger.info(
      `Seed: paintings collection already has ${paintingCount.totalDocs} doc(s), skipping initial seed.`,
    );
  }

  // 4. Backfill `series='fragment'` on any painting missing the new series field
  await backfillSeries(payload);

  // 5. Seed Vyākulatā paintings (drafts) if none exist
  const vyakCount = await payload.count({
    collection: 'paintings',
    where: { series: { equals: 'vyakulata' } },
  });
  if (vyakCount.totalDocs === 0) {
    payload.logger.info('Seed: adding Vyākulatā series drafts...');
    await seedVyakulataPaintings(payload);
    payload.logger.info('Seed: Vyākulatā drafts created.');
  }
}

async function backfillSeries(payload: Payload) {
  // Any painting created before the `series` field was introduced comes back
  // with no value — set them to 'fragment' (the original body of work).
  const { docs } = await payload.find({
    collection: 'paintings',
    limit: 1000,
    depth: 0,
    draft: true,
  });
  const needing = (docs as Array<{ id: number | string; series?: string | null }>).filter(
    (p) => !p.series || p.series === null,
  );
  if (needing.length === 0) return;
  for (const p of needing) {
    await payload.update({
      collection: 'paintings',
      id: p.id,
      data: { series: 'fragment' } as Record<string, unknown>,
    });
  }
  payload.logger.info(`Seed: backfilled series='fragment' on ${needing.length} painting(s).`);
}

// ──────────────────────────────────────────────────────────────
// Site Copy seed
// ──────────────────────────────────────────────────────────────

async function seedSiteCopy(payload: Payload) {
  await payload.updateGlobal({
    slug: 'site-copy',
    data: {
      seeded: true,

      // ─── Home ─────────────────────────────────────
      home_subNavText: '· STUDIO · IN / SG / DE · OPEN',
      home_heroTagline: 'FRAGMENT · ABSTRACT PAINTER · IN / SG / DE',
      home_heroHeadline: lexMixed([
        { text: 'Paintings that ' },
        { text: 'hold their', italic: true },
        { text: ' breath.' },
      ]) as unknown as Record<string, unknown>,
      home_heroSubtext:
        'A colourblind painter working between India, Singapore, and Germany. Crackle networks and gradient-splatter inversions — a practice built on the tension between chaos and control. Represented through Maio Studio, Singapore.',
      home_statementLines: [
        { line: 'I am colourblind.' },
        {
          line:
            'My paintings are systems looking for order — cobalt, craze, gradient, splatter, held at the moment they begin to fail.',
        },
        { line: 'An Eastern sensibility in an international grammar.' },
      ],
      home_fiveRoomsIntro:
        'Five pieces from the Fragment series. Each piece sits alone on a wall. Pricing on request — enquire for availability, shipping, and collector details. Represented through Maio Studio, Singapore.',
      home_finalCallHeadline: lexMixed([
        { text: "Let's " },
        { text: 'put colour', italic: true },
        { text: ' on your wall.' },
      ]) as unknown as Record<string, unknown>,
      home_finalCallSubtext:
        'Collector enquiries, gallery submissions, studio visits — every message answered personally within 48 hours. Represented through Maio Studio, Singapore.',
      home_footerText: 'Studio · Vadodara / Singapore / Düsseldorf · 2026',

      // ─── Artist ───────────────────────────────────
      artist_heroHeadline: lexMixed([
        { text: 'A painter ' },
        { text: 'between chaos', italic: true },
        { text: ' and control.' },
      ]) as unknown as Record<string, unknown>,
      artist_heroSubtext:
        'A studio practice built on a paradox: a colourblind painter whose entire language is colour. Working between India, Singapore, and Germany — built on two signature techniques and a single question: what does a painting look like when it is also a system?',
      artist_portraitCaption: 'PORTRAIT · STUDIO',
      artist_noteOne: lex(
        "I am interested in the places where organic systems fail gracefully — neural maps, cracked skin, constellations, decay. My paintings are attempts to hold that failure still long enough to look at it. I am colourblind. I have spent my whole life feeling colour rather than naming it. I think that is why I trust it.",
      ) as unknown as Record<string, unknown>,
      artist_noteTwo: lex(
        "The work is made in layers. Cobalt laid flat. Gold pulled through craze. Splatter inverted against gradient. Each technique is a way of arguing with my own hand — laying something down and then asking whether it was true. I travelled to eighty countries before I understood that I had been looking for a way to stay still. The paintings are where I stay still.",
      ) as unknown as Record<string, unknown>,
      artist_noteThree: lex(
        "Jung taught me that what we cannot say directly, we say in image. Krishnamurti taught me that clear seeing requires the destruction of what I already think I know. I grew up looking at Eastern miniatures and ornament. I paint in an international abstract grammar. The friction between those two things is, so far, the thing I have most to say.",
      ) as unknown as Record<string, unknown>,
      artist_biography: lexParas([
        'Rushit Shah was born in Vadodara, Gujarat, on 8 September 1986. He lives and works between India, Singapore, and Germany.',
        'He is colourblind.',
        "This is not a footnote. It is the foundation of everything he makes. Where other painters see colour as fact, Shah experiences it as force — approximate, atmospheric, felt before it is named. Unable to rely on the eye's easy certainties, he has built a practice around what colour does rather than what it is: its weight, its temperature, the pressure it exerts against an adjacent tone. The result is an instinctive colour intelligence that trained painters spend decades trying to acquire. Shah arrived at it by necessity, and it shows.",
        "His path to painting was not direct. He has travelled to more than eighty countries — not as tourism, but as a kind of extended looking. Deserts, coastlines, markets, ruins, other people's ordinary days. The accumulation of those images, and the losses that came alongside them — including the death of his father — pushed him toward abstraction as the only form capacious enough to hold what he was carrying.",
        "He found his way into the work through Carl Jung's ideas on the unconscious — the notion that what we cannot say directly, we express in symbol and image — and through J. Krishnamurti's understanding of perception: that how we see is inseparable from who we are, and that truly clear looking requires the dismantling of what we already believe we know. Both thinkers remain active in his practice. Every layer laid down, every craze pulled through, every splatter inverted is a form of not-knowing-in-advance — an argument with his own certainty.",
        "His early work absorbed the energy of action painting — Pollock's physicality, Klee's structural wit, Kandinsky's belief that form carries emotional necessity, Van Gogh's refusal to let surface lie flat. These were formative encounters. He has moved through them and arrived somewhere that belongs to no one else.",
        'The current work is built on two signature techniques. The first: a cobalt ground broken by gold craze — crackle networks that behave like capillaries, like fault lines, like the maps of systems under stress. Red arrives only where the surface cannot hold. The second: a gold-to-silver gradient interrupted by inverted black-and-white splatter — black claiming the warm zone, white claiming the cool. The counterintuition is the point. Both techniques ask the same question: what does order look like at the moment it begins to fail?',
        'Shah calls the current body of work Fragment — a series of eight to ten paintings building toward a debut exhibition. The reference is biological and cosmic simultaneously: neural networks, constellations, decay patterns, the moment before a structure collapses into something new. An Eastern ornamental sensibility filtered through an international abstract grammar.',
        'Currently represented through Maio Studio, Singapore. Collector enquiries and gallery submissions welcome directly.',
      ]) as unknown as Record<string, unknown>,
      artist_arcItems: [
        {
          year: 'early',
          title: 'Vadodara',
          description:
            'A self-taught beginning in Gujarat — watching, drawing, waiting. The practice starts as attention, not ambition.',
        },
        {
          year: '2020s',
          title: 'Eighty countries',
          description:
            'Extended looking, not tourism. Deserts, coastlines, markets, ruins. The accumulation becomes the grammar.',
        },
        {
          year: '2024',
          title: 'The crackle',
          description:
            'Cobalt skin, gold craze, red where the surface splits. The first signature technique finds its shape.',
        },
        {
          year: '2025',
          title: 'Inversion',
          description:
            'Gold-to-silver gradients with inverted black-and-white splatter. A grammar that belongs to no one else.',
        },
        {
          year: '2026',
          title: 'Fragment · Maio Studio',
          description:
            'A cohesive body of work begins — eight to ten paintings toward a debut exhibition. Currently represented through Maio Studio, Singapore.',
        },
        {
          year: '+',
          title: 'Longer view',
          description:
            'Museum walls, international fairs, collectors who see the long arc of a practice. Present tense.',
        },
      ],
      artist_techniqueOne_title: 'Crackle Network',
      artist_techniqueOne_description: lex(
        "Cobalt is laid as ground — dense, flat, unbroken. Over it, a crackle medium is worked until the surface fails on its own terms: fissures open like capillaries, fault lines, the aftermath of a system under pressure. Gold is pulled through the craze; red arrives only at the points of maximum stress, only where the surface could not hold. The network that results is not designed. It is allowed.",
      ) as unknown as Record<string, unknown>,
      artist_techniqueTwo_title: 'Gradient-Splatter Inversion',
      artist_techniqueTwo_description: lex(
        "A ground moves from warm gold to cool silver — a gradient laid as smooth as the hand allows. Then: splatter, inverted. Black lands in the warm zone; white in the cool. The logic reverses what the eye expects. The result is a surface in argument with itself — order and disruption occupying the same gesture, neither winning, both present. This is the technique most fully Shah's own.",
      ) as unknown as Record<string, unknown>,
      artist_representationText: lexParas([
        'Maio Studio · Singapore',
        'Collector enquiries and gallery submissions welcome.',
        'rs@rushitshah.com',
      ]) as unknown as Record<string, unknown>,

      // ─── Shows ────────────────────────────────────
      shows_headline: lexMixed([
        { text: 'No shows ' },
        { text: 'yet.', italic: true },
        { text: ' Working on it.' },
      ]) as unknown as Record<string, unknown>,
      shows_subtext:
        'The first exhibition is in preparation — a cohesive body of work from the Fragment series. Target: 2027, Vadodara / Mumbai and beyond. If you represent a gallery or curate shows and want to talk early, I would like to hear from you.',
      shows_upcomingTitle: 'FRAGMENT — A Debut Exhibition',
      shows_upcomingDetails: lexParas([
        'Work in progress · 8–10 paintings',
        'Venue: TBC · Vadodara / Mumbai',
        'Status: Seeking gallery representation',
      ]) as unknown as Record<string, unknown>,
      shows_pastShows: [],

      // ─── Archive ──────────────────────────────────
      archive_headline: lexMixed([
        { text: 'The work, ' },
        { text: 'in order.', italic: true },
      ]) as unknown as Record<string, unknown>,
      archive_subtext:
        'All completed works. Pricing on request. Collector enquiries welcome for any piece.',
      archive_footerNote:
        'New work added as it leaves the studio. Follow @rushitshah08 for studio updates.',

      // ─── Contact ──────────────────────────────────
      contact_headline: lexMixed([
        { text: 'Start a ' },
        { text: 'conversation.', italic: true },
      ]) as unknown as Record<string, unknown>,
      contact_subtext:
        'Collector enquiries, gallery submissions, studio visits, or a hello — I reply to everything within 48 hours.',
      contact_email: 'rs@rushitshah.com',
      contact_location: 'Vadodara · Gujarat, India · shipping worldwide',
      contact_instagram_url: 'https://instagram.com/rushitshah08',
      contact_instagram_handle: '@rushitshah08',
      contact_linkedin_url: 'https://www.linkedin.com/in/rushitshah',
      contact_replyTimeText: 'typical reply within 48 hours',

      // ─── Global ───────────────────────────────────
      global_siteName: 'Rushit Shah',
      global_siteTagline: 'Abstract Painter · Vadodara',
      global_metaDescription:
        'Abstract paintings by Rushit Shah — crackle networks, gradient-splatter inversions, and the Fragment series. A studio practice between India, Singapore, and Germany.',
      global_representationLine: 'Represented through Maio Studio, Singapore',
      global_studioLocations: 'IN / SG / DE',
    },
  });
}

// ──────────────────────────────────────────────────────────────
// Paintings seed (5 from the Fragment series)
// ──────────────────────────────────────────────────────────────

type PaintingSeed = {
  title: string;
  systemNumber: string;
  slug: string;
  year: number;
  medium: string;
  shortDescription: string;
  technique: 'crackle' | 'gradient-splatter' | 'other';
  status: 'available' | 'in-progress';
  featured: boolean;
  featuredOrder?: number;
  published: boolean;
};

const paintingSeeds: PaintingSeed[] = [
  {
    title: 'Gradient Inversion',
    systemNumber: 'No. 01 / SYS',
    slug: 'gradient-inversion',
    year: 2026,
    medium: 'Acrylic & metal leaf on canvas',
    shortDescription:
      'Gold pulled toward silver — inverted black-and-white splatter holding the fall. The signature of the practice.',
    technique: 'gradient-splatter',
    status: 'available',
    featured: true,
    featuredOrder: 1,
    published: true,
  },
  {
    title: 'Network / Cobalt',
    systemNumber: 'No. 02 / SYS',
    slug: 'network-cobalt',
    year: 2025,
    medium: 'Acrylic, crackle medium & gold leaf on canvas',
    shortDescription:
      'A crackle network — cobalt skin split by gold fissures, red flares where the surface could not hold.',
    technique: 'crackle',
    status: 'available',
    featured: true,
    featuredOrder: 2,
    published: true,
  },
  {
    title: 'Decay Map',
    systemNumber: 'No. 03 / SYS',
    slug: 'decay-map',
    year: 2025,
    medium: 'Acrylic on canvas',
    shortDescription:
      'Teal laid thick, red pulled through — a weathered record of decision and reversal.',
    technique: 'other',
    status: 'available',
    featured: true,
    featuredOrder: 3,
    published: true,
  },
  {
    title: 'Constellation Field',
    systemNumber: 'No. 04 / SYS',
    slug: 'constellation-field',
    year: 2026,
    medium: 'Acrylic & ink on canvas',
    shortDescription:
      'A map of small bright events — points that refuse to resolve into a picture and remain as weather.',
    technique: 'other',
    status: 'in-progress',
    featured: true,
    featuredOrder: 4,
    published: false,
  },
  {
    title: 'Residue Field',
    systemNumber: 'No. 05 / SYS',
    slug: 'residue-field',
    year: 2026,
    medium: 'Acrylic on canvas',
    shortDescription:
      'What a day in the studio leaves behind — pigment at rest, memory of gesture, no intent left at all.',
    technique: 'other',
    status: 'in-progress',
    featured: true,
    featuredOrder: 5,
    published: false,
  },
];

async function seedPaintings(payload: Payload) {
  for (const p of paintingSeeds) {
    await payload.create({
      collection: 'paintings',
      data: {
        title: p.title,
        systemNumber: p.systemNumber,
        slug: p.slug,
        year: p.year,
        medium: p.medium,
        shortDescription: p.shortDescription,
        longDescription: lex(p.shortDescription) as unknown as Record<string, unknown>,
        technique: p.technique,
        series: 'fragment',
        status: p.status,
        featured: p.featured,
        ...(p.featuredOrder ? { featuredOrder: p.featuredOrder } : {}),
        published: p.published,
        ...(p.published ? { publishedAt: new Date().toISOString() } : {}),
      } as Record<string, unknown>,
    });
  }
}

// ──────────────────────────────────────────────────────────────
// Vyākulatā series seed — 5 drafts, in-progress, ready for Rushit
// to upload images and flip to Published when done.
// ──────────────────────────────────────────────────────────────

type VyakulataSeed = {
  title: string;
  systemNumber: string;
  slug: string;
  shortDescription: string;
};

const vyakulataSeeds: VyakulataSeed[] = [
  {
    title: 'Vyākulatā I — Restless Hand',
    systemNumber: 'No. 01 / VYA',
    slug: 'vyakulata-i-restless-hand',
    shortDescription:
      'The first mark, laid before the body has settled. Restlessness as the ground everything else is painted on.',
  },
  {
    title: 'Vyākulatā II — Spilled Prayer',
    systemNumber: 'No. 02 / VYA',
    slug: 'vyakulata-ii-spilled-prayer',
    shortDescription:
      'A devotional gesture that loses its shape in transit — gold leaking from certainty into doubt.',
  },
  {
    title: 'Vyākulatā III — Gold Anxiety',
    systemNumber: 'No. 03 / VYA',
    slug: 'vyakulata-iii-gold-anxiety',
    shortDescription:
      'Where the crackle outpaces the surface — fissures arriving faster than pigment can seal.',
  },
  {
    title: 'Vyākulatā IV — Tremor Pattern',
    systemNumber: 'No. 04 / VYA',
    slug: 'vyakulata-iv-tremor-pattern',
    shortDescription:
      'A controlled vibration held just at the threshold of collapse. Order built from continuous unrest.',
  },
  {
    title: 'Vyākulatā V — The Composed Chaos',
    systemNumber: 'No. 05 / VYA',
    slug: 'vyakulata-v-the-composed-chaos',
    shortDescription:
      'The last panel. Everything the series was circling around — agitation as a form of prayer.',
  },
];

async function seedVyakulataPaintings(payload: Payload) {
  for (let i = 0; i < vyakulataSeeds.length; i++) {
    const s = vyakulataSeeds[i];
    await payload.create({
      collection: 'paintings',
      data: {
        title: s.title,
        systemNumber: s.systemNumber,
        slug: s.slug,
        year: 2026,
        medium: 'Acrylic, crackle medium & gold leaf on canvas',
        shortDescription: s.shortDescription,
        longDescription: lex(s.shortDescription) as unknown as Record<string, unknown>,
        technique: 'crackle',
        series: 'vyakulata',
        status: 'in-progress',
        featured: true,
        featuredOrder: i + 1,
        published: false,
      } as Record<string, unknown>,
    });
  }
}
