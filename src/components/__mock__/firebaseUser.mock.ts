import type { User, UserMetadata, UserInfo } from 'firebase/auth';

const mockProvider: UserInfo = {
  providerId: 'password',
  uid: 'test-uid-123',
  displayName: 'Test User',
  email: 'test@example.com',
  phoneNumber: null,
  photoURL: 'https://example.com/avatar.png',
};

export const mockUser: User = {
  uid: 'test-uid-123',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: 'https://example.com/avatar.png',
  emailVerified: true,
  phoneNumber: null,
  isAnonymous: false,
  providerData: [mockProvider],
  providerId: 'password',
  tenantId: null,
  refreshToken: 'mock-refresh-token',
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  } as UserMetadata,
  delete: vi.fn(),
  getIdToken: vi.fn().mockResolvedValue('mock-id-token'),
  getIdTokenResult: vi.fn(),
  reload: vi.fn(),
  toJSON: vi.fn(),
};
