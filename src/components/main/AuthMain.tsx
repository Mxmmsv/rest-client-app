import { Button, Flex, Typography } from 'antd';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

const { Title } = Typography;

export default function AuthMain() {
  const [user] = useAuthState(auth);
  const { logout } = useAuth();

  return (
    <Flex vertical gap={10} justify="center" align="center" style={{ height: '100vh' }}>
      <Title>{`Welcome back, ${user?.displayName || 'user'}`}</Title>
      <Flex gap={10} justify="center" align="center">
        <Link href="/rest-client">
          <Button>Rest Client</Button>
        </Link>
        <Link href="/history">
          <Button>History</Button>
        </Link>
      </Flex>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </Flex>
  );
}
