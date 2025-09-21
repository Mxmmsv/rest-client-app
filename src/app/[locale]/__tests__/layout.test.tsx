import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import * as nextNavigation from 'next/navigation';
import { useTranslations, IntlErrorCode } from 'next-intl';
import { describe, it, expect, vi } from 'vitest';

import getRequestConfig from '@/i18n/request';

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

describe('request configuration', () => {
  const callConfig = (locale: string) =>
    getRequestConfig({ requestLocale: Promise.resolve(locale) });

  it('logs an error to console when a translation is missing', async () => {
    const config = await callConfig('en');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    config.onError?.({
      code: IntlErrorCode.MISSING_MESSAGE,
      originalMessage: undefined,
      name: '',
      message: '',
    });

    expect(spy).toHaveBeenCalledWith(
      'Missing translation:',
      expect.objectContaining({ code: 'MISSING_MESSAGE' })
    );

    spy.mockRestore();
  });

  it('reports unexpected errors to the tracking system', async () => {
    const config = await callConfig('en');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    config.onError?.({
      code: IntlErrorCode.INVALID_MESSAGE,
      originalMessage: undefined,
      name: '',
      message: '',
    });

    expect(spy).toHaveBeenCalledWith(
      'Report to tracking system:',
      expect.objectContaining({ code: 'INVALID_MESSAGE' })
    );

    spy.mockRestore();
  });

  it('returns a fallback message when a translation is missing', async () => {
    const config = await callConfig('en');
    const text = config.getMessageFallback?.({
      namespace: 'TestPage',
      key: 'TestComponent',
      error: {
        code: IntlErrorCode.MISSING_MESSAGE,
        originalMessage: undefined,
        name: '',
        message: '',
      },
    });
    expect(text).toBe('TestPage.TestComponent is not yet translated');
  });

  it('returns a fallback message for other translation errors', async () => {
    const config = await callConfig('en');
    const fallback = config.getMessageFallback?.({
      namespace: 'TestPage',
      key: 'TestComponent',
      error: {
        code: IntlErrorCode.INVALID_MESSAGE,
        originalMessage: undefined,
        name: '',
        message: '',
      },
    });
    expect(fallback).toBe('Developer, please fix this message: TestPage.TestComponent');
  });
});
