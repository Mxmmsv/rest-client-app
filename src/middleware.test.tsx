import nextIntlMiddleware from 'next-intl/middleware';
import { vi, describe, it, expect } from 'vitest';

import { config } from '@/middleware';

import { routing } from './i18n/routing';

vi.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('middleware', () => {
  it('should call createMiddleware with routing', () => {
    const createMiddleware = vi.mocked(nextIntlMiddleware);

    expect(createMiddleware).toHaveBeenCalledWith(routing);

    expect(config.matcher).toBe('/((?!api|trpc|_next|_vercel|.*\\..*).*)');
  });
});
