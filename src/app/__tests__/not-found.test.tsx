import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import NotFoundPage from '../not-found';

const translations: Record<string, Record<string, string>> = {
  en: {
    sorry: 'Sorry, page not found',
    'button-back': 'Back Home',
  },
  ru: {
    sorry: 'Страница, которую вы ищите, не найдена.',
    'button-back': 'На главную',
  },
};

let currentLocale = 'en';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => translations[currentLocale][key],
}));

describe('NotFoundPage', () => {
  it('renders not-found page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders en translations', () => {
    currentLocale = 'en';
    render(<NotFoundPage />);

    expect(screen.getByText(/Sorry, page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back Home/i })).toBeInTheDocument();
  });

  it('renders ru translations', () => {
    currentLocale = 'ru';
    render(<NotFoundPage />);

    expect(screen.getByText(/Страница, которую вы ищите, не найдена./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /На главную/i })).toBeInTheDocument();
  });

  it('displays a button linking to the home page', () => {
    currentLocale = 'en';
    render(<NotFoundPage />);
    const button = screen.getByRole('button', { name: /Back Home/i });
    expect(button.closest('a')).toHaveAttribute('href', '/');
  });
});
