import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  secret?: string;
  paths?: string[];
};

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'secret-not-configured' }, { status: 500 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  if (body.secret !== secret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const paths = Array.isArray(body.paths) ? body.paths.filter((p) => typeof p === 'string' && p.startsWith('/')) : [];
  if (paths.length === 0) {
    return NextResponse.json({ ok: false, error: 'no-paths' }, { status: 400 });
  }

  const revalidated: string[] = [];
  for (const p of paths) {
    revalidatePath(p);
    revalidated.push(p);
  }

  return NextResponse.json({ ok: true, revalidated });
}
