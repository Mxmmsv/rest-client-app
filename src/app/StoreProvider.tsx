'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import type { AppStore } from '@/lib/store/store';
import { makeStore } from '@/lib/store/store';

import type { ReactNode } from 'react';

export default function StoreProvider({ children }: Readonly<{ children: ReactNode }>) {
  const storeRef = useRef<AppStore>(undefined);
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}

//! https://redux-toolkit.js.org/usage/nextjs
