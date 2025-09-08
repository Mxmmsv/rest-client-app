import '@ant-design/v5-patch-for-react-19';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

import Header from '@/components/header/Header';
import { customTheme } from '@/lib/antd/theme';

import StoreProvider from './StoreProvider';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REST client',
  description: 'REST client app for final task in RSSchool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AntdRegistry>
            <ConfigProvider theme={customTheme}>
              <Header />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
