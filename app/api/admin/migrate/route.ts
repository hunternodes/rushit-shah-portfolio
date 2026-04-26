import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

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
    // Drizzle's schema-push lives behind payload.db.push. It's the same
    // path the dev server uses on first connect.
    const db = payload.db as unknown as {
      push?: () => Promise<void>;
      migrate?: () => Promise<void>;
    };
    if (typeof db.push === 'function') {
      await db.push();
      return NextResponse.json({ ok: true, ran: 'push' });
    }
    if (typeof db.migrate === 'function') {
      await db.migrate();
      return NextResponse.json({ ok: true, ran: 'migrate' });
    }
    return NextResponse.json(
      { error: 'no push or migrate method on adapter' },
      { status: 500 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: String(err), stack: err instanceof Error ? err.stack : undefined },
      { status: 500 },
    );
  }
}
