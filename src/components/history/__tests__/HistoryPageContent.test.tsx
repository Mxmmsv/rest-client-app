import { render } from '@testing-library/react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { adminAuth, adminDb } from '@/lib/requests/firebaseAdmin';

import HistoryPageContent from '../HistoryPageContent';

import type { DecodedIdToken } from 'firebase-admin/auth';

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/lib/requests/firebaseAdmin', () => ({
  adminAuth: {
    verifySessionCookie: vi.fn(),
  },
  adminDb: {
    collection: vi.fn(),
  },
}));

vi.mock('@/components/history/EmptyHistoryPage', () => ({
  default: () => <div data-testid="empty-history">No history</div>,
}));

function createMockDecodedToken(uid: string): DecodedIdToken {
  return {
    uid,
    aud: 'test-aud',
    auth_time: 1700000000,
    exp: 1700003600,
    firebase: {
      identities: {},
      sign_in_provider: 'custom',
    },
    iat: 1700000000,
    iss: 'https://securetoken.google.com/test-project',
    sub: uid,
  };
}

describe('HistoryPageContent', () => {
  const mockCookieValue = 'mock_token';
  const mockUid = 'user_123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login if token is not found', async () => {
    vi.mocked(cookies).mockReturnValue({
      get: vi.fn().mockReturnValue({ undefined }),
      getAll: vi.fn(),
      [Symbol.iterator]: vi.fn(),
      size: 1,
    } as unknown as ReturnType<typeof cookies>);
    await HistoryPageContent();

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('redirects to login if token verification fails', async () => {
    vi.mocked(cookies).mockReturnValue({
      get: vi.fn().mockReturnValue({ value: mockCookieValue }),
      getAll: vi.fn(),
      [Symbol.iterator]: vi.fn(),
      size: 1,
    } as unknown as ReturnType<typeof cookies>);

    vi.mocked(adminAuth.verifySessionCookie).mockRejectedValue(new Error('Invalid token'));

    await HistoryPageContent();

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('renders EmptyHistoryPage if history is not found', async () => {
    vi.mocked(cookies).mockReturnValue({
      get: vi.fn().mockReturnValue({ value: mockCookieValue }),
      getAll: vi.fn(),
      [Symbol.iterator]: vi.fn(),
      size: 1,
    } as unknown as ReturnType<typeof cookies>);

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue(createMockDecodedToken(mockUid));

    const mockGet = vi.fn().mockResolvedValue({ docs: [] });

    const mockCollection = {
      where: vi.fn().mockReturnValue({
        orderBy: vi.fn().mockReturnValue({
          get: mockGet,
        }),
      }),
    } as unknown as FirebaseFirestore.CollectionReference;

    vi.mocked(adminDb.collection).mockReturnValue(mockCollection);

    const result = await HistoryPageContent();

    const { getByTestId } = render(result);
    expect(getByTestId('empty-history')).toBeTruthy();
  });
});
