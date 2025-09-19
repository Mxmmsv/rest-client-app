import { DatabaseOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

import Loader from '../Loader';

const { Title, Paragraph } = Typography;

export default function AuthMain() {
  const [user, loading, error] = useAuthState(auth);
  const { logout } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Flex vertical gap={10} justify="center" align="center">
      <Card
        style={{
          textAlign: 'center',
          backgroundColor: 'transparent',
          border: 'solid var(--color-additional-light)',
          boxShadow: '0 4px 10px var(--color-additional)',
          background: 'var(--color-additional-light)',
        }}
      >
        <Title>{`Welcome back, ${user?.displayName || 'user'}`}</Title>
        <Flex gap={10} justify="center">
          <Card style={{ background: 'white' }}>
            <Flex vertical>
              <Flex gap={10} wrap>
                <Link href="/rest-client">
                  <Button icon={<DatabaseOutlined />}>Rest Client</Button>
                </Link>
                <Paragraph type="secondary">Wanna make request?</Paragraph>
              </Flex>
              <Flex gap={10} wrap>
                <Link href="/history">
                  <Button icon={<HistoryOutlined />}>History</Button>
                </Link>
                <Paragraph type="secondary">Wanna watch previous requests?</Paragraph>
              </Flex>
            </Flex>
          </Card>
          <Card style={{ background: 'white' }}>
            <Flex gap={10} wrap>
              <Paragraph type="secondary">Wanna switch account?</Paragraph>
              <Button danger type="primary" onClick={logout} icon={<LogoutOutlined />}>
                Logout
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
}
