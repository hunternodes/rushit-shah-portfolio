import type { CollectionConfig } from 'payload';

/**
 * Exhibitions — every show Rushit's work has been part of.
 *
 * Source-of-truth for /exhibitions. Used to be a hardcoded array in the
 * page file; pulling it into Payload so:
 *   • New shows can be added from the admin without a code deploy.
 *   • Each show can carry a press URL, hero image, and longer write-up
 *     for future per-show detail pages.
 *
 * The page groups shows by year and sorts by date desc. We expose a real
 * Date field rather than a "13 Apr 2026" string so sorting/grouping stays
 * locale-aware and predictable.
 */
export const Exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'venue', 'date', 'type', 'published'],
    listSearchableFields: ['title', 'venue', 'city'],
    description:
      'Every exhibition Rushit\'s work has been part of. Group shows + solos. Sorted newest first on the public /exhibitions page.',
  },
  access: {
    read: () => true, // public-read so the site can query published shows
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Exhibition title, e.g. "A Measure of Many"' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Opening date — used to sort and to format the row label.',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
      admin: { description: 'Gallery / venue name, e.g. "Shades Gallery" or "CKP"' },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'group',
      options: [
        { label: 'Solo', value: 'solo' },
        { label: 'Group', value: 'group' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pressUrl',
      type: 'text',
      admin: {
        description: 'Optional link — gallery exhibition page, press release, review.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional hero image. Used on per-exhibition detail pages later.',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      admin: {
        description: 'Full write-up — press release text, curatorial note, or a paragraph about the work shown.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Pinned at the top of the list regardless of date. Use for current / upcoming.',
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Untick to hide from the public site without deleting.',
        position: 'sidebar',
      },
    },
  ],
};
