import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import { pushDevSchema } from '@payloadcms/drizzle';
import config from '@/payload.config';
// Force Turbopack to trace drizzle-kit/api into the lambda bundle.
// pushDevSchema lazy-requires it at runtime; without an explicit static
// import the file-tracing skips it and the lambda 404s on the require.
import 'drizzle-kit/api';

/**
 * One-off migration trigger.
 *
 * Hit this endpoint with `?token=<MIGRATE_TOKEN>` (matches the env var of
 * the same name) to force Payload to push its schema to the configured
 * Postgres database. Drizzle's `push` mode adds any missing tables/columns
 * — safe to run repeatedly.
 *
 * Why this exists at all: Vercel's serverless runtime doesn't give us a
 * post-deploy shell hook to run `payload migrate`, and the local CLI
 * resolves TS imports differently from Next.js so it can't be run from a
 * dev machine without rewriting every relative import. This route runs
 * inside the Next.js context where the imports already work.
 *
 * Delete this route once a real migration flow is in place.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  const expected = process.env.MIGRATE_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  try {
    const payload = await getPayload({ config });
    // pushDevSchema is the same routine Payload runs on dev startup when
    // adapter.push !== false. It compares the in-memory schema to the live
    // database and applies the diff. Production mode normally short-circuits
    // it; calling it directly bypasses that check.
    await pushDevSchema(payload.db as unknown as Parameters<typeof pushDevSchema>[0]);
    return NextResponse.json({ ok: true, ran: 'pushDevSchema' });
  } catch (err) {
    return NextResponse.json(
      { error: String(err), stack: err instanceof Error ? err.stack : undefined },
      { status: 500 },
    );
  }
}
