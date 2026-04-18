import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.artworkarchive.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default withPayload(nextConfig);
