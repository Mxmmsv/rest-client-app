'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

import { makeStore, AppStore } from '@/lib/store/store';

export default function StoreProvider({ children }: Readonly<{ children: ReactNode }>) {
  const storeRef = useRef<AppStore>(undefined);
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}

//! https://redux-toolkit.js.org/usage/nextjs#providing-the-store

// The next step is to include the StoreProvider anywhere in the tree above where the store is used.
// You can locate the store in the layout component if all the routes using that layout need the store.
// Or if the store is only used in a specific route you can create
// and provide the store in that route handler.
// In all client components further down the tree,
// you can use the store exactly as you would normally using the hooks provided by react-redux.

//! В общем, когда потребуется использовать RTK,
//! необходимо обернуть компонент, где он используется в <StoreProvider></StoreProvider>
