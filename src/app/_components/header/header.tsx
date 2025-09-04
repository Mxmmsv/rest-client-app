'use client';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const isAuth = false;

function Header() {
  return (
    <Layout.Header className="sticky top-0 z-50 transition-all duration-300">
      <Flex justify="space-between" align="center" className="h-full px-24">
        <Link href="/" className="flex items-center gap-8">
          <Image src="/logo.webp" alt="REST Client Logo" width={55} height={55} />
          <Typography.Title className="mb-0 text-inherit">REST Client</Typography.Title>
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
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button type="primary">Sign Up</Button>
              </Link>
            </Space>
          ) : (
            <Button>Sign Out</Button>
          )}
        </Flex>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
