import { render, screen, fireEvent } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi, describe, it, expect } from 'vitest';

import { mockUser } from '@/components/__mock__/firebaseUser.mock';
import { useAuth } from '@/lib/auth/useAuth';

import AuthMain from '../AuthMain';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/lib/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/components/Loader', () => ({
  default: () => <div role="status">Loading...</div>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      welcomeBack: 'Welcome back,',
      restClient: 'Rest Client',
      makeRequest: 'Wanna make request?',
      history: 'History',
      watchRequests: 'Wanna watch previous requests?',
      switchAccount: 'Wanna switch account?',
      logout: 'Logout',
    };
    return translations[key] || key;
  },
}));

const baseMockAuth = {
  logInWithEmailAndPassword: vi.fn(),
  registerWithEmailAndPassword: vi.fn(),
  logout: vi.fn(),
};

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseAuth = vi.mocked(useAuth);

describe('AuthMain component', () => {
  it('should render welcome message with user displayName', () => {
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);
    mockedUseAuth.mockReturnValue(baseMockAuth);

    render(<AuthMain />);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent(`Welcome back, ${mockUser.displayName}`);
  });

  it('should call logout on button click', () => {
    const logoutMock = vi.fn();
    mockedUseAuth.mockReturnValue({
      ...baseMockAuth,
      logout: logoutMock,
    });
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

    render(<AuthMain />);
    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
    expect(logoutMock).toHaveBeenCalled();
  });
});
