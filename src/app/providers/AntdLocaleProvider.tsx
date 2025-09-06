'use client';

import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { createContext, useContext, useState, ReactNode } from 'react';

type LocaleKey = 'en' | 'ru';
const antLocales = { en: enUS, ru: ruRU };

type LocaleContextValue = {
  locale: LocaleKey;
  setLocale: (value: LocaleKey) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const useAntdLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useAntdLocale must be used inside AntdLocaleProvider');
  return ctx;
};

export function AntdLocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocale] = useState<LocaleKey>('en');

  const changeLocale = (value: LocaleKey) => {
    setLocale(value);
    dayjs.locale(value);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      <ConfigProvider locale={antLocales[locale]}>{children}</ConfigProvider>
    </LocaleContext.Provider>
  );
}
