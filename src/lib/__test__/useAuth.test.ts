/* eslint-disable sonarjs/no-hardcoded-passwords */
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
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

const mockApi = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
  open: vi.fn(),
  destroy: vi.fn(),
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logInWithEmailAndPassword', () => {
    it('should call api.success on successful login', async () => {
      vi.mocked(signInWithEmailAndPassword).mockResolvedValueOnce({} as never);
      const { logInWithEmailAndPassword } = useAuth();

      await logInWithEmailAndPassword({
        email: 'test@test.com',
        password: '123456',
        api: mockApi,
      });

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        'test@test.com',
        '123456'
      );
      expect(mockApi.success).toHaveBeenCalledWith({ message: 'Success login!' });
    });

    it('should call api.error on login failure', async () => {
      vi.mocked(signInWithEmailAndPassword).mockRejectedValueOnce(new Error('fail'));
      const { logInWithEmailAndPassword } = useAuth();

      await logInWithEmailAndPassword({
        email: 'fail@test.com',
        password: '123456',
        api: mockApi,
      });

      expect(mockApi.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Login failed',
          description: 'fail',
        })
      );
    });
  });

  describe('registerWithEmailAndPassword', () => {
    it('should call addDoc, updateProfile and api.success on successful registration', async () => {
      vi.mocked(createUserWithEmailAndPassword).mockResolvedValueOnce({
        user: { uid: '123' },
      } as never);
      vi.mocked(addDoc).mockResolvedValueOnce({} as never);

      const { registerWithEmailAndPassword } = useAuth();

      await registerWithEmailAndPassword({
        name: 'Max',
        email: 'max@test.com',
        password: '123456',
        api: mockApi,
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
      expect(mockApi.success).toHaveBeenCalledWith({ message: 'Success register!' });
    });

    it('should call api.error on registration failure', async () => {
      vi.mocked(createUserWithEmailAndPassword).mockRejectedValueOnce(new Error('register fail'));
      const { registerWithEmailAndPassword } = useAuth();

      await registerWithEmailAndPassword({
        name: 'Fail',
        email: 'fail@test.com',
        password: '123456',
        api: mockApi,
      });

      expect(mockApi.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'register failed',
          description: 'register fail',
        })
      );
    });
  });

  describe('logout', () => {
    it('should call signOut and api.success on successful logout', () => {
      const { logout } = useAuth();

      logout({ api: mockApi });

      expect(signOut).toHaveBeenCalled();
      expect(mockApi.success).toHaveBeenCalledWith({ message: 'Success logout!' });
    });

    it('should call api.error on logout failure', () => {
      vi.mocked(signOut).mockImplementationOnce(() => {
        throw new Error('logout fail');
      });

      const { logout } = useAuth();

      logout({ api: mockApi });

      expect(mockApi.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Logout failed',
          description: 'logout fail',
        })
      );
    });
  });
});
