import { render, screen, act } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import { mockUser } from '../__mock__/firebaseUser.mock';
import SignIn from '../signIn';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query as unknown,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn().mockImplementation(() => {}),
}));

vi.mock('@/lib/auth/useAuth', () => ({
  useAuth: () => ({
    logInWithEmailAndPassword: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
  }),
}));

vi.mock('antd/es/notification/useNotification', () => ({
  __esModule: true,
  default: () => [vi.fn(), <div key="ctx">NotificationCtx</div>],
}));

const mockedUseAuthState = vi.mocked(useAuthState);

describe('signIn component', () => {
  it('shoud render sign-in form when no user', async () => {
    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    await act(async () => {
      render(<SignIn />);
    });

    expect(document.querySelector('.ant-form')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shoud render loading spinner', () => {
    mockedUseAuthState.mockReturnValue([null, true, undefined]);

    render(<SignIn />);
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('shoud render error message', () => {
    mockedUseAuthState.mockReturnValue([
      null,
      false,
      {
        message: 'Auth error',
        name: '',
      },
    ]);

    render(<SignIn />);
    expect(screen.getByText(/Auth error/i)).toBeInTheDocument();
  });

  describe('logged-in ', () => {
    it('shoud render logged-in layout', () => {
      mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

      render(<SignIn />);
      expect(screen.getByText(`Hi, ${mockUser.displayName}`)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    });

    it('should render logged-in layout with null user displayName', () => {
      mockedUseAuthState.mockReturnValue([{ ...mockUser, displayName: null }, false, undefined]);

      render(<SignIn />);

      expect(screen.getByText('Hi, user')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    });
  });
});
