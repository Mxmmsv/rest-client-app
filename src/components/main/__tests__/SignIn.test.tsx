import { render, screen, act, fireEvent } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import { useAuth } from '@/lib/auth/useAuth';

import { mockUser } from '../../__mock__/firebaseUser.mock';
import SignIn from '../SignIn';

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

vi.mock('@/components/Loader', () => ({
  default: () => <div role="status">Loading...</div>,
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
    expect(screen.getByRole('status')).toBeInTheDocument();
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

  it('should call logInWithEmailAndPassword on form submit', async () => {
    const logInMock = vi.fn().mockResolvedValue(undefined);
    mockedUseAuth.mockReturnValue({
      logInWithEmailAndPassword: logInMock,
      logout: vi.fn(),
      registerWithEmailAndPassword: vi.fn(),
    });

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

    expect(logInMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      // eslint-disable-next-line sonarjs/no-hardcoded-passwords
      password: 'password123!',
    });
  });

  it('should redirect when user is logged in', () => {
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);
    render(<SignIn />);
    expect(mockedRedirect).toHaveBeenCalledWith('/');
  });
});
