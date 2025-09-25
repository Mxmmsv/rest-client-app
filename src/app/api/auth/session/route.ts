import { NextResponse } from 'next/server';

import { adminAuth } from '@/lib/requests/firebaseAdmin';

type Body = { idToken: string };

export async function POST(req: Request) {
  const { idToken } = (await req.json()) as Body;
  if (!idToken) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  try {
    const expiresIn = 60 * 60 * 24 * 3 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ ok: true });
    res.cookies.set('firebase_token', sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: expiresIn / 1000,
      sameSite: 'lax',
    });

    return res;
  } catch (err: unknown) {
    let message = 'Unauthorized';
    if (err instanceof Error) {
      message =
        err.cause instanceof Error ? `${err.message}. Cause: ${err.cause.message}` : err.message;
    }
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
