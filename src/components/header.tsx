'use client';

import { Flex, Typography, Button } from 'antd';
import Link from 'next/link';

export default function Header() {
  return (
    <Flex justify="center" align="center" gap="middle">
      <Link href="/">
        <Typography.Title level={2}>Rest Client</Typography.Title>
      </Link>
      <Flex justify="center" align="center" gap="middle">
        <Link href="/login">
          <Button variant="link">Login</Button>
        </Link>

        <Link href="/register">
          <Button variant="link">Register</Button>
        </Link>
      </Flex>
    </Flex>
  );
}
