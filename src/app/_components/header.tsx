'use client';

import { Flex, Typography, Button } from 'antd';
import Link from 'next/link';

export default function Header() {
  return (
    <Flex justify="center" align="center" gap="middle">
      <Link href="/">
        <Typography.Title>Rest Client</Typography.Title>
      </Link>
      <Flex justify="center" align="center" gap="middle">
        <Button variant="link">
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="link">
          <Link href="/register">Register</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
