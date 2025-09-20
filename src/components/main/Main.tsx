'use client';

import { Flex, Layout, theme } from 'antd';
import dynamic from 'next/dynamic';
import { useAuthState } from 'react-firebase-hooks/auth';

import UnauthMain from '@/components/main/UnauthMain';
import { auth } from '@/lib/auth/firebase.config';

import Loader from '../Loader';

const { Content } = Layout;
const AuthMain = dynamic(() => import('@/components/main/AuthMain'), {
  loading: () => <Loader />,
});

function MainPage() {
  const [user, loading, error] = useAuthState(auth);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  if (error) {
    if (loading) {
      return <Loader />;
    }

    return (
      <Flex justify="center" vertical align="center" gap="middle" style={{ height: '100vh' }}>
        Authentication error: {error.message}
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
            background: 'var(--color-base-light)',
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
