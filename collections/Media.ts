import type { CollectionConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// `dirname` = .../collections — resolve to /public/uploads one level up
const staticDir = path.resolve(dirname, '..', 'public', 'uploads');

export const Media: CollectionConfig = {
  slug: 'media',
  /**
   * Upload routing:
   *   • In production, the @payloadcms/storage-s3 plugin (configured in
   *     payload.config.ts) intercepts these uploads and sends the bytes to
   *     Cloudflare R2. `staticDir` becomes a no-op.
   *   • In local dev without S3_* env vars set, uploads fall back to
   *     `staticDir` (public/uploads) so the dev workflow still works.
   */
  upload: {
    staticDir,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'tablet', width: 1200 },
      { name: 'desktop', width: 2000 },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    // Max ~25MB — matches spec
    // Payload's default is 20MB; bump via Next body size in server config if needed
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'category', 'updatedAt'],
    description:
      'Images uploaded here are stored under /public/uploads for now. Alt text is required for accessibility.',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers. Required.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption shown under the image on detail views.',
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'other',
      options: [
        { label: 'Painting — Main', value: 'painting-main' },
        { label: 'Painting — Detail', value: 'painting-detail' },
        { label: 'Studio', value: 'studio' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Process', value: 'process' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
};
