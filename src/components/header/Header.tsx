'use client';

import { Button, Flex, Layout, Space, Typography } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';
import { cn } from '@/lib/cn';

import LanguageToggle from '../languageToggle/LanguageToggle';

const { Title } = Typography;
const { Header: AntHeader } = Layout;

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [api, contextHolder] = useNotification();
  const { logout } = useAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout({ api });
  };

  return (
    <AntHeader
      data-sticky={isSticky}
      className={cn('sticky top-0 z-50 transition-all duration-300', 'header')}
    >
      {contextHolder}
      <Flex justify="space-between" align="center" className="h-full px-24">
        <Link href="/" className={cn('flex items-end gap-4', 'transition-all duration-500')}>
          <Image
            src="/logo.webp"
            alt="REST Client Logo"
            width={isSticky ? 40 : 55}
            height={isSticky ? 40 : 55}
            className={cn(
              'header-title transition-all',
              'duration-300 hover:scale-101 hover:drop-shadow-lg',
              'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]',
              'transition-all duration-300'
            )}
          />
          <Title
            level={3}
            className={cn(
              'header-title transition-all',
              'duration-300 hover:scale-101 hover:drop-shadow-lg',
              'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]'
            )}
          >
            PAWSTMAN
          </Title>
        </Link>
        <Flex justify="space-between" align="center" gap="middle">
          {user ? (
            <Space>
              <Link href="/">
                <Button
                  type="link"
                  style={{ fontSize: '18px', color: 'var(--color-additional-light)' }}
                >
                  Home
                </Button>
              </Link>
              <LanguageToggle />
              <Button onClick={handleLogout}>Logout</Button>
            </Space>
          ) : (
            <Space>
              <LanguageToggle />
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          )}
        </Flex>
      </Flex>
    </AntHeader>
  );
}

export default Header;
