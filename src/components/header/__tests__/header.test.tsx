import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { mockUser } from '@/components/__mock__/firebaseUser.mock';
import { useAuth } from '@/lib/auth/useAuth';

import Header from '../header';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn(),
    useEffect: vi.fn(),
  };
});

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('@/lib/auth/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('antd/es/notification/useNotification', () => ({
  __esModule: true,
  default: () => [vi.fn(), <div key="ctx">NotificationCtx</div>],
}));

const mockedUseAuthState = vi.mocked(useAuthState);
const mockedUseAuth = vi.mocked(useAuth);

describe('Header component', () => {
  const setStickyMock = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.mocked(useState).mockImplementation(() => [false, setStickyMock]);
    vi.mocked(useEffect).mockImplementation((fn) => fn());
    mockedUseAuth.mockReturnValue({
      logInWithEmailAndPassword: vi.fn(),
      registerWithEmailAndPassword: vi.fn(),
      logout: mockLogout,
    });

    mockedUseAuthState.mockReturnValue([null, false, undefined]);
  });

  it('should shows Login and Register when user is not authenticated', () => {
    render(<Header />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  it('should shows Logout when user is authenticated', () => {
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

    render(<Header />);

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
  });

  it('should call logout function when Logout button is clicked', () => {
    mockedUseAuthState.mockReturnValue([mockUser, false, undefined]);

    render(<Header />);
    const signOutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(signOutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('should render logo with small size when isSticky is true', () => {
    vi.mocked(useState).mockImplementation(() => [true, setStickyMock]);
    render(<Header />);

    const logo = screen.getByAltText('REST Client Logo');
    expect(logo).toHaveAttribute('width', '40');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('should render logo with large size when isSticky is false', () => {
    vi.mocked(useState).mockImplementation(() => [false, setStickyMock]);
    render(<Header />);

    const logo = screen.getByAltText('REST Client Logo');
    expect(logo).toHaveAttribute('width', '55');
    expect(logo).toHaveAttribute('height', '55');
  });
});
