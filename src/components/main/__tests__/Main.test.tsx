import { render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import MainPage from '../Main';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/components/main/AuthMain', () => ({
  default: () => <div data-testid="auth-main">AuthMain</div>,
}));

vi.mock('@/components/main/UnauthMain', () => ({
  default: () => <div data-testid="unauth-main">UnauthMain</div>,
}));

vi.mock('@/components/Loader', () => ({
  default: () => <div role="status">Loading...</div>,
}));

const mockedUseAuthState = vi.mocked(useAuthState);

describe('MainPage', () => {
  it('renders error message if error exists', () => {
    mockedUseAuthState.mockReturnValue([null, false, { message: 'Auth error', name: '' }]);

    render(<MainPage />);
    expect(screen.getByText(/Authentication error/i)).toBeInTheDocument();
  });

  it('renders loader when loading with error', () => {
    mockedUseAuthState.mockReturnValue([null, true, { message: 'Auth error', name: '' }]);

    render(<MainPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders UnauthMain when no user and no error', () => {
    mockedUseAuthState.mockReturnValue([null, false, undefined]);

    render(<MainPage />);
    expect(screen.getByTestId('unauth-main')).toBeInTheDocument();
  });
});
