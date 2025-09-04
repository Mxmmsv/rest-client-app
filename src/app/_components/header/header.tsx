'use client';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const isAuth = false;

function Header() {
  return (
    <Layout.Header>
      <Flex justify="space-between" align="center">
        <Link href="/" className="flex items-center gap-8">
          <Image src="/logo.webp" alt="REST Client Logo" width={55} height={55} />
          <Typography.Title className="!mb-0 !text-inherit">REST Client</Typography.Title>
        </Link>
        <Space>
          <Button type="text" className="!text-white" icon={<GlobalOutlined />} />
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
        </Space>
      </Flex>
    </Layout.Header>
  );
}

export default Header;
