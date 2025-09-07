'use client';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useAuth } from '@/lib/auth/useAuth';
import { cn } from '@/lib/cn';
import { useAppSelector } from '@/lib/store/hooks';

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const isAuth = useAppSelector((state) => state.auth?.isAuthenticated ?? false);
  const [api, contextHolder] = useNotification();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout({ api });
  };

  return (
    <Layout.Header
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
          <Typography.Title
            className={cn(
              'header-title transition-all',
              'duration-300 hover:scale-101 hover:drop-shadow-lg',
              'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]'
            )}
          >
            PAWSTMAN
          </Typography.Title>
        </Link>
        <Flex justify="space-between" align="center" gap="middle">
          <Button
            type="primary"
            variant="outlined"
            style={{
              color: 'var(--color-yellow)',
              fontSize: '20px',
            }}
            icon={<GlobalOutlined />}
          />
          {!isAuth ? (
            <Space>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          ) : (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </Flex>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
