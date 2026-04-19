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
    defaultColumns: ['title', 'year', 'status', 'featured', 'published'],
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
            if (value) return value;
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
        description: 'Primary hero image of the painting.',
      },
    },
    {
      name: 'detailImages',
      type: 'array',
      maxRows: 8,
      admin: {
        description: 'Up to 8 close-ups, side views, or process shots.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'status',
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
