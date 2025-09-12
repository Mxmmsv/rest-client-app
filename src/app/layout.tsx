import '@ant-design/v5-patch-for-react-19';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Press_Start_2P, Quantico } from 'next/font/google';

import { customTheme } from '@/lib/antd/theme';

import StoreProvider from './StoreProvider';

import type { Metadata } from 'next';
const press_start_2p_font = Press_Start_2P({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-press-start-2p',
  display: 'swap',
});

const quantico_font = Quantico({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quantico',
  display: 'swap',
});

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
    <html lang="en" className={`${press_start_2p_font.variable} ${quantico_font.variable}`}>
      <body>
        <StoreProvider>
          <AntdRegistry>
            <ConfigProvider theme={customTheme}>{children}</ConfigProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
