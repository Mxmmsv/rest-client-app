'use client';

import { Flex, Layout, theme } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import AuthMain from '@/components/main/AuthMain';
import UnauthMain from '@/components/main/UnauthMain';
import { auth } from '@/lib/auth/firebase.config';

const { Content } = Layout;

function MainPage() {
  const [user, error] = useAuthState(auth);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  if (error) {
    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as Error).message
        : String(error);
    return (
      <Flex justify="center" vertical align="center" gap="middle" style={{ height: '100vh' }}>
        Authentication error: {errorMessage}
      </Flex>
    );
  }

  if (user) {
    return (
      <Content style={{ height: '75vh', padding: '48px' }}>
        <Flex
          justify="center"
          style={{
            height: '100%',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: '48px',
          }}
        >
          <AuthMain />
        </Flex>
      </Content>
    );
  }

  return (
    <Layout className="flex min-h-screen">
      <Content style={{ padding: '48px 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <UnauthMain />
        </div>
      </Content>
    </Layout>
  );
}
export default MainPage;
