import { render, screen, act, fireEvent } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import { useAuth } from '@/lib/auth/useAuth';

import { mockUser } from '../__mock__/firebaseUser.mock';
import SignIn from '../signIn';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn().mockImplementation(() => {}),
}));

vi.mock('@/lib/auth/useAuth', () => ({
  useAuth: vi.fn(() => ({
    logInWithEmailAndPassword: vi.fn().mockResolvedValue(undefined),
    registerWithEmailAndPassword: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
  })),
}));

vi.mock('antd/es/notification/useNotification', () => ({
  __esModule: true,
  default: () => [vi.fn(), <div key="ctx">NotificationCtx</div>],
}));

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseAuth = vi.mocked(useAuth);
const mockedRedirect = vi.mocked(redirect);

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

  it('should call logInWithEmailAndPassword and redirect on form submit', async () => {
    const logInMock = vi.fn().mockResolvedValue(undefined);
    const redirectMock = vi.fn() as unknown as typeof redirect;

    mockedUseAuth.mockReturnValue({
      logInWithEmailAndPassword: logInMock,
      logout: vi.fn(),
      registerWithEmailAndPassword: vi.fn(),
    });

    mockedRedirect.mockImplementation(redirectMock);

    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    render(<SignIn />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123!' } });
      fireEvent.click(submitButton);
    });

    expect(logInMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        // eslint-disable-next-line sonarjs/no-hardcoded-passwords
        password: 'password123!',
        api: expect.any(Function) as unknown,
      })
    );

    expect(redirectMock).toHaveBeenCalledWith('/');
  });

  it('should call logOut', () => {
    const logOutMock = vi.fn().mockResolvedValue(undefined);

    mockedUseAuth.mockReturnValue({
      logInWithEmailAndPassword: vi.fn(),
      logout: logOutMock,
      registerWithEmailAndPassword: vi.fn(),
    });

    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

    render(<SignIn />);

    const logOutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logOutButton);
    expect(logOutMock).toBeCalled();
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
