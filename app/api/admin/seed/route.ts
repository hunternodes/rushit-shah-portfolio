import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { seed } from '@/lib/seed';

/**
 * Debug + force-seed endpoint.
 *
 * GET /api/admin/seed?token=<MIGRATE_TOKEN>
 *   → reports current row counts for every collection.
 *
 * GET /api/admin/seed?token=<MIGRATE_TOKEN>&run=1
 *   → also re-runs the seed function and surfaces any thrown error
 *     in the response body (the production onInit hook swallows seed
 *     errors via try/catch, so they never reach Vercel logs visibly).
 *
 * Same MIGRATE_TOKEN gate as /api/admin/migrate.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const expected = process.env.MIGRATE_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const payload = await getPayload({ config });

  const out: Record<string, unknown> = {};

  // 1. Snapshot current state — never throws on its own; if it does,
  //    that's the actual signal (table missing, schema drifted, etc).
  for (const slug of ['users', 'paintings', 'media', 'enquiries'] as const) {
    try {
      const c = await payload.count({ collection: slug });
      out[`count_${slug}`] = c.totalDocs;
    } catch (err) {
      out[`count_${slug}_error`] = String(err);
    }
  }

  // 2. Optionally re-run seed and report the outcome.
  if (req.nextUrl.searchParams.get('run') === '1') {
    try {
      await seed(payload);
      out.seed = 'ok';
    } catch (err) {
      out.seed_error = String(err);
      out.seed_stack = err instanceof Error ? err.stack : undefined;
    }

    // Re-snapshot counts after seed.
    for (const slug of ['users', 'paintings', 'media'] as const) {
      try {
        const c = await payload.count({ collection: slug });
        out[`count_after_${slug}`] = c.totalDocs;
      } catch (err) {
        out[`count_after_${slug}_error`] = String(err);
      }
    }
  }

  return NextResponse.json(out);
}
