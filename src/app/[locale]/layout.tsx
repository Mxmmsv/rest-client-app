import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import 'dayjs/locale/ru';

import { routing } from '@/i18n/routing';

const antLocales = { en: enUS, ru: ruRU };

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  dayjs.locale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <ConfigProvider locale={antLocales[locale]}>{children}</ConfigProvider>
    </NextIntlClientProvider>
  );
}
