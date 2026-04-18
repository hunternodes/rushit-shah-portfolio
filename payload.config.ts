import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  sharp,
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
