import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import { createTestStore } from '@/app/__tests__/mock-redux';
import Header from '@/app/_components/header/header';

describe('Header component', () => {
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
});
