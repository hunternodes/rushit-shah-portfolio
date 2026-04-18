import type { CollectionConfig } from 'payload';

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'topic', 'relatedPainting', 'status', 'createdAt'],
    description: 'Contact-form submissions. Public can create; only admin can read or edit.',
  },
  access: {
    // The public contact form creates these — so create is open.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'topic',
      type: 'select',
      required: true,
      defaultValue: 'inquiry',
      options: [
        { label: 'General enquiry', value: 'inquiry' },
        { label: 'Collector / commission', value: 'commission' },
        { label: 'Gallery / exhibition', value: 'exhibition' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'relatedPainting',
      type: 'relationship',
      relationTo: 'paintings',
      admin: {
        description: 'If the enquiry came from a specific painting page, captured here.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Responded', value: 'responded' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        description: 'Your follow-up notes — not shown publicly.',
      },
    },
  ],
};
