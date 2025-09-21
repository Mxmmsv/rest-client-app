import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import * as nextNavigation from 'next/navigation';
import { useTranslations } from 'next-intl';
import { describe, it, expect, vi } from 'vitest';

import LocaleLayout from '../layout';

let localeForMock: string;

vi.mock('dayjs');
vi.mock('next-intl/server', () => ({
  getMessages: vi.fn().mockResolvedValue({ hello: 'Hello' }),
  getRequestConfig: (fn: unknown) => fn,
}));
vi.mock('next-intl', () => ({
  hasLocale: (locales: string[], requested: string) => locales.includes(requested),
  IntlErrorCode: { MISSING_MESSAGE: 'MISSING_MESSAGE', INVALID_MESSAGE: 'INVALID_MESSAGE' },
  NextIntlClientProvider: ({ children, locale }: { children: React.ReactNode; locale: string }) => {
    localeForMock = locale;
    return <>{children}</>;
  },
  useTranslations: () => {
    const messages: Record<string, Record<string, string>> = {
      en: { hello: 'Hello' },
      ru: { hello: 'Привет' },
    };
    return (key: string) => messages[localeForMock][key] || `Missing translation: ${key}`;
  },
}));

vi.mock('@/components/header/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('@/components/footer/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('next/navigation', () => ({ notFound: vi.fn() }));

const TestChild = () => {
  const t = useTranslations();
  return <p>{t('hello')}</p>;
};

describe('LocaleLayout', () => {
  it('renders children, Header and Footer for valid locale (en)', async () => {
    render(
      await LocaleLayout({
        children: <TestChild />,
        params: Promise.resolve({ locale: 'en' }),
      })
    );

    expect(await screen.findByText('Header')).toBeInTheDocument();
    expect(await screen.findByText('Footer')).toBeInTheDocument();
    expect(await screen.findByText('Hello')).toBeInTheDocument();
    expect(dayjs.locale).toHaveBeenCalledWith('en');
  });

  it('renders children, Header and Footer for valid locale (ru)', async () => {
    render(
      await LocaleLayout({
        children: <TestChild />,
        params: Promise.resolve({ locale: 'ru' }),
      })
    );

    expect(await screen.findByText('Header')).toBeInTheDocument();
    expect(await screen.findByText('Footer')).toBeInTheDocument();
    expect(await screen.findByText('Привет')).toBeInTheDocument();
    expect(dayjs.locale).toHaveBeenCalledWith('ru');
  });

  it('calls notFound when locale is invalid', async () => {
    await LocaleLayout({
      children: <div>child</div>,
      params: Promise.resolve({ locale: 'xx' }),
    });

    expect(nextNavigation.notFound).toHaveBeenCalled();
  });
});
