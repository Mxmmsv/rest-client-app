import { render, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createTestStore } from '@/app/__tests__/mock-redux';
import Header from '@/app/_components/header/header';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: vi.fn(),
    useEffect: vi.fn(),
  };
});

describe('Header component', () => {
  const setStickyMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useState).mockImplementation(() => [false, setStickyMock]);
    vi.mocked(useEffect).mockImplementation((fn) => fn());
  });

  it('should shows Sign In an d sign Up when user is not authenticated', () => {
    const testStore = createTestStore({ auth: { isAuthenticated: false } });
    render(
      <Provider store={testStore}>
        <Header />
      </Provider>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('should shows Sign Out when user is authenticated', () => {
    const testStore = createTestStore({ auth: { isAuthenticated: true } });
    render(
      <Provider store={testStore}>
        <Header />
      </Provider>
    );

    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });

  it('should render logo with small size when isSticky is true', () => {
    vi.mocked(useState).mockImplementation(() => [true, setStickyMock]);

    const testStore = createTestStore({ auth: { isAuthenticated: false } });
    render(
      <Provider store={testStore}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText('REST Client Logo');
    expect(logo).toHaveAttribute('width', '40');
    expect(logo).toHaveAttribute('height', '40');
  });

  it('should render logo with large size when isSticky is false', () => {
    vi.mocked(useState).mockImplementation(() => [false, setStickyMock]);

    const testStore = createTestStore({ auth: { isAuthenticated: false } });
    render(
      <Provider store={testStore}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText('REST Client Logo');
    expect(logo).toHaveAttribute('width', '55');
    expect(logo).toHaveAttribute('height', '55');
  });
});
