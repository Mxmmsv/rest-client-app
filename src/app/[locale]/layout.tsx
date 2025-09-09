import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import 'dayjs/locale/ru';

import Footer from '@/components/footer/Footer';
import { routing } from '@/i18n/routing';

const antLocales = { en: enUS, ru: ruRU } as const;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  dayjs.locale(locale);

  const antLocale = antLocales[locale as keyof typeof antLocales] || enUS;

  return (
    <NextIntlClientProvider locale={locale}>
      <ConfigProvider locale={antLocale}>
        {children}
        <Footer />
      </ConfigProvider>
    </NextIntlClientProvider>
  );
}
