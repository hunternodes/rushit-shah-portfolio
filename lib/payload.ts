import { getPayload, type Payload } from 'payload';
import config from '@payload-config';

/**
 * Cached Payload client for server components / route handlers.
 * Safe to call from any RSC — `getPayload` handles deduping internally.
 */
let cached: Promise<Payload> | null = null;

export function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
