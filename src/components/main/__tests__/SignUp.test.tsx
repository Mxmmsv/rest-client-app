import { render, screen, act, fireEvent } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import { useAuth } from '@/lib/auth/useAuth';

import { mockUser } from '../../__mock__/firebaseUser.mock';
import SignUp from '../SignUp';

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

vi.mock('../Loader', () => ({
  default: () => <div role="status">Loading...</div>,
}));

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseAuth = vi.mocked(useAuth);
const mockedRedirect = vi.mocked(redirect);

describe('SignUp component', () => {
  it('should render register form with no user', async () => {
    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    await act(async () => {
      render(<SignUp />);
    });

    expect(document.querySelector('.ant-form')).toBeInTheDocument();
  });

  it('shoud render loading spinner', () => {
    mockedUseAuthState.mockReturnValue([null, true, undefined]);

    render(<SignUp />);
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

    render(<SignUp />);
    expect(screen.getByText(/Auth error/i)).toBeInTheDocument();
  });

  it('should redirect to main page after visit registration page with logged-in auth', () => {
    const redirectMock = vi.fn() as unknown as typeof redirect;

    mockedRedirect.mockImplementation(redirectMock);
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

    render(<SignUp />);

    expect(redirectMock).toHaveBeenCalledWith('/');
  });

  it('should call registerWithEmailAndPassword on form submit', async () => {
    const registerMock = vi.fn().mockResolvedValue(undefined);

    mockedUseAuth.mockReturnValue({
      logInWithEmailAndPassword: vi.fn(),
      logout: vi.fn(),
      registerWithEmailAndPassword: registerMock,
    });

    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    render(<SignUp />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123!' } });
      fireEvent.change(nameInput, { target: { value: 'aboba' } });
      fireEvent.click(submitButton);
    });

    expect(registerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        // eslint-disable-next-line sonarjs/no-hardcoded-passwords
        password: 'password123!',
        name: 'aboba',
        api: expect.any(Function) as unknown,
      })
    );
  });
});
