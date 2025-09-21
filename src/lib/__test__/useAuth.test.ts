/* eslint-disable sonarjs/no-hardcoded-passwords */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { auth } from '../auth/firebase.config';
import { useAuth } from '../auth/useAuth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  addDoc: vi.fn(),
  collection: vi.fn(() => ({})),
}));

vi.mock('../auth/firebase.config', () => ({
  auth: { currentUser: { reload: vi.fn() } },
  db: {},
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockedToast = vi.mocked(toast);

const mockUser: Partial<User> = {
  getIdToken: vi.fn().mockResolvedValue('fake-token'),
};

const mockUserCredential: Partial<UserCredential> = {
  user: mockUser as User,
};

vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce(mockUserCredential as UserCredential);

global.fetch = vi.fn().mockResolvedValue(
  new Response(JSON.stringify({}), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  }) as unknown as Response
);

import type { UserCredential, User } from 'firebase/auth';

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logInWithEmailAndPassword', () => {
    it('should call toast.success on successful login', async () => {
      const mockCredential: Partial<UserCredential> = {
        user: mockUser as User,
      };

      vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce(mockCredential as UserCredential);

      const { logInWithEmailAndPassword } = useAuth();

      await logInWithEmailAndPassword({
        email: 'test@test.com',
        password: '123456',
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        'test@test.com',
        '123456'
      );

      expect(mockedToast.success).toHaveBeenCalledWith('Success login!');
    });
  });

  describe('registerWithEmailAndPassword', () => {
    it('should call addDoc, updateProfile and toast.success on successful registration', async () => {
      const mockUserObj = {
        uid: '123',
        getIdToken: vi.fn().mockResolvedValue('fake-token'),
      } as Partial<User> as User;

      vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({
        user: mockUserObj,
      } as Partial<UserCredential> as UserCredential);

      vi.mocked(addDoc).mockResolvedValueOnce({} as never);

      const { registerWithEmailAndPassword } = useAuth();

      await registerWithEmailAndPassword({
        name: 'Max',
        email: 'max@test.com',
        password: '123456',
      });

      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
        uid: '123',
        name: 'Max',
        authProvider: ' local ',
        email: 'max@test.com',
      });
      expect(updateProfile).toHaveBeenCalledWith(auth.currentUser, {
        displayName: 'Max',
      });
      expect(auth.currentUser?.reload).toHaveBeenCalled();
      expect(mockedToast.success).toHaveBeenCalledWith('Success register!');
    });

    it('should call toast.error on registration failure', async () => {
      vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce(new Error('register fail'));

      const { registerWithEmailAndPassword } = useAuth();

      await registerWithEmailAndPassword({
        name: 'Fail',
        email: 'fail@test.com',
        password: '123456',
      });

      expect(mockedToast.error).toHaveBeenCalledWith('Register failed register fail');
    });
  });

  describe('logout', () => {
    it('should call signOut and toast.success on successful logout', async () => {
      const { logout } = useAuth();

      await logout();

      expect(signOut).toHaveBeenCalled();
      expect(mockedToast.success).toHaveBeenCalledWith('Success logout! We will miss you!');
    });

    it('should call toast.error on logout failure', async () => {
      vi.mocked(signOut).mockImplementationOnce(() => {
        throw new Error('logout fail');
      });

      const { logout } = useAuth();

      await logout();

      expect(mockedToast.error).toHaveBeenCalledWith('Logout failed logout fail');
    });
  });
});
