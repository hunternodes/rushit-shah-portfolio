import type { CollectionConfig } from 'payload';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const Paintings: CollectionConfig = {
  slug: 'paintings',
  admin: {
    useAsTitle: 'title',
    // `series` and `featuredOrder` added so the list view answers the two
    // questions Rushit had to click into each painting to see: which series
    // is this in, and what slot does it claim. With these visible, the
    // admin list is the dashboard for "what's on the homepage and where".
    defaultColumns: [
      'title',
      'series',
      'featuredOrder',
      'year',
      'availability',
      'featured',
      'published',
    ],
    listSearchableFields: ['title', 'medium', 'shortDescription'],
    description:
      'Every artwork lives here. Published + featured paintings appear in homepage Five Rooms; all paintings are surfaced via /collection (ArtworkArchive embed).',
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  access: {
    read: () => true, // public-read so the site can query published paintings
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      /**
       * Auto-swap featuredOrder when there's a conflict.
       *
       * Without this hook, two paintings can share the same featuredOrder
       * (e.g. both set to slot 2 in Fragment series) and the homepage
       * sort tiebreaker silently picks one — leaving Rushit confused
       * about why his "set this to 2" instruction didn't take.
       *
       * Behaviour: when a painting is saved with featuredOrder=N in a
       * given series, any OTHER featured painting in the same series
       * with the same N is updated to take this painting's PREVIOUS
       * featuredOrder. Net effect: a swap.
       *   • New painting moves into its requested slot.
       *   • The painting it displaced moves to where the new one used
       *     to be (or null if it had no previous slot).
       *
       * Recursion guard: the cascading update sets `req.context
       * .skipFeaturedOrderSwap = true` so the hook short-circuits when
       * called from itself.
       */
      async ({ data, originalDoc, req, operation }) => {
        // Bail out of recursive calls (we trigger ourselves via update())
        if ((req.context as { skipFeaturedOrderSwap?: boolean })?.skipFeaturedOrderSwap) {
          return data;
        }
        // Only act on featured paintings with a numeric featuredOrder.
        if (!data?.featured) return data;
        const newOrder = data.featuredOrder;
        if (typeof newOrder !== 'number' || newOrder < 1) return data;

        const series = (data.series ?? originalDoc?.series) as string | undefined;
        if (!series) return data;
        const myId = (originalDoc as { id?: number | string } | undefined)?.id;

        // Skip if the order didn't change on update.
        if (
          operation === 'update' &&
          (originalDoc as { featuredOrder?: number } | undefined)?.featuredOrder === newOrder &&
          (originalDoc as { series?: string } | undefined)?.series === series &&
          (originalDoc as { featured?: boolean } | undefined)?.featured === true
        ) {
          return data;
        }

        // Find any OTHER featured painting in the same series at the same slot.
        // Inline the `where` clause so Payload's `Where` type is inferred —
        // hoisting it into a `const` typed as `Record<string, unknown>` is
        // structurally incompatible because Payload's `Where` is a discriminated
        // union and TS can't narrow through an index signature.
        const { docs: conflicts } = await req.payload.find({
          collection: 'paintings',
          where: {
            and: [
              { featuredOrder: { equals: newOrder } },
              { series: { equals: series } },
              { featured: { equals: true } },
              ...(myId != null ? [{ id: { not_equals: myId } }] : []),
            ],
          },
          limit: 10,
          depth: 0,
          // Drafts can also occupy slots — include them.
          draft: true,
        });

        if (conflicts.length === 0) return data;

        // Swap: every conflicting painting gets the OLD featuredOrder of
        // this painting (or null if there was no old order, e.g. on create).
        const oldOrder = (originalDoc as { featuredOrder?: number | null } | undefined)
          ?.featuredOrder ?? null;
        for (const c of conflicts) {
          await req.payload.update({
            collection: 'paintings',
            id: (c as { id: number | string }).id,
            data: { featuredOrder: oldOrder } as Record<string, unknown>,
            // Mark the cascade so we don't recurse forever.
            context: { skipFeaturedOrderSwap: true },
          });
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Gradient Inversion"',
      },
    },
    {
      name: 'systemNumber',
      type: 'text',
      required: true,
      admin: {
        description: 'Catalogue number, e.g. "No. 01 / SYS"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: 'Auto-generated from title. Reserved for detail-page URLs.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            // ALWAYS normalize. Previous version only slugified when value
            // was empty, which left spaces/uppercase in slugs Rushit had
            // already saved (e.g. "When The Light Stayed" instead of
            // "when-the-light-stayed"). Now: anything non-empty gets
            // slugified, anything empty derives from the title.
            if (value) return slugify(String(value));
            if (data?.title) return slugify(String(data.title));
            return value;
          },
        ],
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 1900,
      max: 2100,
    },
    {
      name: 'medium',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Acrylic & metal leaf on canvas"',
      },
    },
    {
      name: 'dimensions',
      type: 'group',
      admin: {
        description: 'Width × Height in inches. Leave blank while actual dimensions are TBC.',
      },
      fields: [
        { name: 'width', type: 'number', admin: { description: 'Inches' } },
        { name: 'height', type: 'number', admin: { description: 'Inches' } },
        {
          name: 'displayString',
          type: 'text',
          admin: {
            description: 'Auto-computed from width × height.',
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                if (siblingData?.width && siblingData?.height) {
                  return `${siblingData.width} × ${siblingData.height} in`;
                }
                return '—';
              },
            ],
          },
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 280,
      admin: {
        description:
          'One-liner shown on Five Rooms cards and archive tiles. ~200 chars max.',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      admin: {
        description: 'Full write-up shown on the painting detail page.',
      },
    },
    {
      name: 'series',
      type: 'select',
      required: true,
      defaultValue: 'fragment',
      admin: {
        position: 'sidebar',
        description: 'Which body of work this painting belongs to. Each series gets its own gallery section on the homepage.',
      },
      options: [
        { label: 'Fragment', value: 'fragment' },
        { label: 'Vyākulatā', value: 'vyakulata' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'technique',
      type: 'select',
      required: true,
      defaultValue: 'other',
      options: [
        { label: 'Crackle Network', value: 'crackle' },
        { label: 'Gradient-Splatter Inversion', value: 'gradient-splatter' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Primary hero image. Click to upload a new file (JPG/PNG/WebP) or pick from existing Media. Uploads save to /public/uploads.',
      },
    },
    {
      name: 'detailImages',
      type: 'array',
      maxRows: 8,
      admin: {
        description:
          'Up to 8 close-ups, side views, or process shots. Click "Add Item" then upload each image.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      // Renamed from `status` because Payload's drafts feature reserves
      // `_status` and the auto-generated enum collided with this field's
      // enum (Drizzle was creating both columns against the same enum name
      // "enum_paintings_status", and the enum's value set could only hold
      // one of {draft,published} or {available,sold,…}). `availability`
      // is more descriptive anyway.
      name: 'availability',
      type: 'select',
      required: true,
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Not For Sale', value: 'not-for-sale' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If checked, appears in homepage Five Rooms.',
        position: 'sidebar',
      },
    },
    {
      name: 'featuredOrder',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Position in Five Rooms (1–5). Only used when Featured is checked.',
        condition: (data) => Boolean(data?.featured),
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If unchecked, hidden from the public site entirely (draft).',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When the painting went live. Auto-set when Published is first checked.',
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData, originalDoc }) => {
            // Auto-stamp publishedAt the first time `published` flips true.
            if (
              siblingData?.published === true &&
              originalDoc?.published !== true &&
              !value
            ) {
              return new Date().toISOString();
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Private notes — collector interest, buyer info, etc. Never shown publicly.',
      },
    },
  ],
};
