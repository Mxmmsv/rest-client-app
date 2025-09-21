import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { vi, Mock } from 'vitest';

import NotFoundPage from '@/app/[locale]/not-found';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('NotFoundPage', () => {
  it('renders not-found page in English', () => {
    const enTranslations: Record<string, string> = {
      sorry: 'Page not found',
      'button-back': 'Back',
    };

    (useTranslations as Mock).mockReturnValue((key: string) => enTranslations[key]);

    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('renders not-found page in Russian', () => {
    const ruTranslations: Record<string, string> = {
      sorry: 'Страница не найдена',
      'button-back': 'На главную',
    };

    (useTranslations as Mock).mockReturnValue((key: string) => ruTranslations[key]);

    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'На главную' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
