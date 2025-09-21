import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import UnauthMain from '../UnauthMain';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      welcome: 'Welcome',
      subtitle: 'Subtitle text',
      helpsHeader: 'Helps Header',
      feature1: 'Feature 1',
      feature2: 'Feature 2',
      feature3: 'Feature 3',
      feature4: 'Feature 4',
      feature5: 'Feature 5',
      feature6: 'Feature 6',
      getStarted: 'Get Started',
      existingAccount: 'Existing account',
      signIn: 'Sign In',
      or: 'or',
      createNew: 'Create New Account',
    };
    return translations[key] ?? key;
  },
}));

describe('UnauthMain component', () => {
  it('should shows Login and Register when user is not authenticated', () => {
    render(<UnauthMain />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.some((btn) => btn.textContent?.includes('Sign In'))).toBe(true);
    expect(buttons.some((btn) => btn.textContent?.includes('Create New Account'))).toBe(true);
  });

  it('should have correct links for Login and Register buttons', () => {
    render(<UnauthMain />);

    const loginButton = screen
      .getAllByRole('button')
      .find((btn) => btn.textContent?.includes('Sign In'));
    const registerButton = screen
      .getAllByRole('button')
      .find((btn) => btn.textContent?.includes('Create New Account'));

    const loginLink = loginButton?.closest('a');
    const registerLink = registerButton?.closest('a');

    expect(loginLink).toHaveAttribute('href', '/login');
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should navigate to login when Login button is clicked', () => {
    render(<UnauthMain />);

    const loginButton = screen
      .getAllByRole('button')
      .find((btn) => btn.textContent?.includes('Sign In'));
    expect(loginButton).toBeInTheDocument();
  });

  it('should navigate to register when Register button is clicked', () => {
    render(<UnauthMain />);

    const registerButton = screen.getByRole('button', { name: /Create New Account/i });
    fireEvent.click(registerButton);

    expect(registerButton).toBeInTheDocument();
  });
});
