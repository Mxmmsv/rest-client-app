import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReactNode } from 'react';

import StoreProvider from './StoreProvider';

export default function Providers({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StoreProvider>
      <AntdRegistry>{children}</AntdRegistry>
    </StoreProvider>
  );
}
