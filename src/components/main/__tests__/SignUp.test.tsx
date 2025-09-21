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

vi.mock('@/components/Loader', () => ({
  default: () => <div role="status">Loading...</div>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'SignUp.welcome': 'Welcome!',
      'SignUp.email': 'Email',
      'SignUp.emailRequired': 'Please input your email!',
      'SignUp.emailInvalid': 'Please enter a valid email!',
      'SignUp.password': 'Password',
      'SignUp.passwordRequired': 'Please input your password!',
      'SignUp.passwordInvalid':
        'Password must be at least 8 characters long and contain a letter, a number, and a special character.',
      'SignUp.confirmPassword': 'Confirm Password',
      'SignUp.confirmPasswordRequired': 'Please confirm your password!',
      'SignUp.passwordsMismatch': 'Passwords do not match!',
      'SignUp.name': 'Name',
      'SignUp.nameRequired': 'Please input your name!',
      'SignUp.nameMinLength': 'Name must be at least 2 characters long.',
      'SignUp.submit': 'Submit',
    };
    return translations[key] || key;
  },
}));

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseAuth = vi.mocked(useAuth);
const mockedRedirect = vi.mocked(redirect);

const TEST_PASSWORD = 'password123!';

describe('SignUp component', () => {
  it('should render register form with no user', async () => {
    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    await act(async () => {
      render(<SignUp />);
    });

    expect(document.querySelector('.ant-form')).toBeInTheDocument();
  });

  it('should render loading spinner', () => {
    mockedUseAuthState.mockReturnValue([null, true, undefined]);

    render(<SignUp />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render error message', () => {
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
    const passwordInput = screen.getAllByLabelText(/Password/i)[0];
    const confirmPasswordInput = screen.getAllByLabelText(/Password/i)[1];
    const nameInput = screen.getByLabelText(/Name/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: TEST_PASSWORD } });
      fireEvent.change(confirmPasswordInput, { target: { value: TEST_PASSWORD } });
      fireEvent.change(nameInput, { target: { value: 'aboba' } });
      fireEvent.click(submitButton);
    });

    expect(registerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        password: TEST_PASSWORD,
        name: 'aboba',
      })
    );
  });
});
