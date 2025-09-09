'use client';

import { Flex, Breadcrumb, Layout, theme } from 'antd';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import AuthMain from '@/components/main/AuthMain';
import UnauthMain from '@/components/main/UnauthMain';
import { auth } from '@/lib/auth/firebase.config';

const { Content } = Layout;

function MainPage() {
  const [user, loading, error] = useAuthState(auth);
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;
  const t = useTranslations('MainPage');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Flex justify="center" vertical align="center" gap="middle" style={{ height: '100vh' }}>
        Authentication error: {error.message}
      </Flex>
    );
  }

  if (user) {
    return <AuthMain />;
  }

  return (
    <Layout className="flex min-h-screen">
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }]} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {t('welcome')}!
          <UnauthMain />
        </div>
      </Content>
    </Layout>
  );
}
export default MainPage;
