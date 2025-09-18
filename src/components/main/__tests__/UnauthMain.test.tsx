import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import UnauthMain from '../UnauthMain';

describe('UnauthMain component', () => {
  it('should render welcome title', () => {
    render(<UnauthMain />);
    expect(screen.getByText(/welcome to pawstman!/i)).toBeInTheDocument();
  });

  it('should shows Login and Register when user is not authenticated', () => {
    render(<UnauthMain />);

    expect(
      screen.getByRole('button', { name: /Sign In to Existing Account/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create New Account/i })).toBeInTheDocument();
  });

  it('should have correct links for Login and Register buttons', () => {
    render(<UnauthMain />);

    const loginLink = screen.getByText(/Sign In to Existing Account/i).closest('a');
    const registerLink = screen.getByText(/Create New Account/i).closest('a');

    expect(loginLink).toHaveAttribute('href', '/login');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should navigate to login when Login button is clicked', () => {
    render(<UnauthMain />);

    const loginButton = screen.getByRole('button', { name: /Sign In to Existing Account/i });
    fireEvent.click(loginButton);

    expect(loginButton).toBeInTheDocument();
  });

  it('should navigate to register when Register button is clicked', () => {
    render(<UnauthMain />);

    const registerButton = screen.getByRole('button', { name: /Create New Account/i });
    fireEvent.click(registerButton);

    expect(registerButton).toBeInTheDocument();
  });
});
