import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { AntdLocaleProvider } from '@/app/providers/AntdLocaleProvider';
import { routing } from '@/i18n/routing';

import Page from '../../components/languageToggle/Page';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <AntdLocaleProvider>
        {children}
        <Page />
      </AntdLocaleProvider>
    </NextIntlClientProvider>
  );
}
