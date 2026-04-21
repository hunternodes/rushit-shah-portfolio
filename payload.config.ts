import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Paintings } from './collections/Paintings';
import { Media } from './collections/Media';
import { Enquiries } from './collections/Enquiries';
import { SiteCopy } from './globals/SiteCopy';
import { seed } from './lib/seed';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Production Payload config.
 *
 * Database — Postgres (Neon).
 *   DATABASE_URI points at a managed Postgres. Works locally (fill .env.local)
 *   and on Vercel (paste into project env vars). The local SQLite adapter was
 *   retired because Vercel's filesystem is ephemeral — every deploy would
 *   wipe the database file.
 *
 * Uploads — Cloudflare R2 via the S3-compatible plugin.
 *   Payload's Media collection still declares image sizes, but the actual
 *   bytes land in the `S3_BUCKET` R2 bucket rather than /public/uploads.
 *   This is critical on Vercel for the same reason — no persistent disk.
 *
 * The `s3Storage` plugin is enabled only when the S3_* env vars are present,
 * so local development without R2 creds still works (uploads fall back to
 * the Media collection's default filesystem behaviour).
 */
const hasS3Creds = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY &&
    process.env.S3_ENDPOINT,
);

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Rushit Shah Studio',
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        hidden: false,
      },
      fields: [],
    },
    Paintings,
    Media,
    Enquiries,
  ],
  globals: [SiteCopy],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Neon (and most managed Postgres) require SSL; `ssl: 'require'` via the
    // connection string's `?sslmode=require` param handles this. Keep this
    // setting simple so local dev against a plain Postgres still works.
  }),
  sharp,
  plugins: hasS3Creds
    ? [
        s3Storage({
          collections: {
            // Route the `media` collection's uploads to R2. Keep image size
            // variants (thumbnail / card / tablet / desktop) — they're
            // generated as usual and each is stored as its own object.
            media: {
              prefix: 'media',
            },
          },
          bucket: process.env.S3_BUCKET!,
          config: {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            endpoint: process.env.S3_ENDPOINT!,
            region: process.env.S3_REGION || 'auto',
            // R2 requires this for S3 SDK v3 compatibility
            forcePathStyle: true,
          },
        }),
      ]
    : [],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    try {
      await seed(payload);
    } catch (err) {
      payload.logger.error({ err }, 'Seed failed');
    }
  },
});
