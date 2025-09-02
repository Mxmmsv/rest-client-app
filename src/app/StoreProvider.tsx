'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, AppStore } from '@/lib/store/store';

export default function StoreProvider({ children }: Readonly<{ children: ReactNode }>) {
  const storeRef = useRef<AppStore>(undefined);
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}

//! https://redux-toolkit.js.org/usage/nextjs
