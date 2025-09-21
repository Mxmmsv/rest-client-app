import { NextRequest, NextResponse } from 'next/server';
import nextIntlMiddleware from 'next-intl/middleware';
import { vi, describe, it, expect } from 'vitest';

import middleware, { config } from '@/middleware';

import { routing } from './i18n/routing';

vi.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: vi.fn(() => vi.fn(() => 'mocked response')),
}));

describe('middleware', () => {
  it('should call createMiddleware with routing', () => {
    const req = new NextRequest('http://localhost/some-path');

    const response = middleware(req);

    const createMiddleware = vi.mocked(nextIntlMiddleware);
    expect(createMiddleware).toHaveBeenCalledWith(routing);
    expect(response).toBe('mocked response');
  });

  it('should redirect to /login if path starts with /history and no token', () => {
    const req = new NextRequest('http://localhost/history');
    Object.defineProperty(req, 'cookies', {
      value: { get: () => undefined },
    });

    const response = middleware(req);

    expect(response instanceof NextResponse).toBe(true);

    expect(response.headers.get('location')).toBe('http://localhost/login');
  });
  it('should call intlMiddleware if token exists', () => {
    const req = new NextRequest('http://localhost/history');
    Object.defineProperty(req, 'cookies', {
      value: { get: () => ({ value: 'fake-token' }) },
    });

    const response = middleware(req);

    expect(response).toBe('mocked response');
  });

  it('config matcher is correct', () => {
    expect(config.matcher).toBe('/((?!api|trpc|_next|_vercel|.*\\..*).*)');
  });
});
