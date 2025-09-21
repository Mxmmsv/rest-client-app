import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware(routing);

  if (req.nextUrl.pathname.startsWith('/history')) {
    const token = req.cookies.get('firebase_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
