import { DatabaseOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

import Loader from '../Loader';

const { Title, Paragraph } = Typography;

export default function AuthMain() {
  const [user, loading] = useAuthState(auth);
  const { logout } = useAuth();
  const t = useTranslations('AuthMain');

  if (loading) {
    return <Loader />;
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
        <Title>{`${t('welcomeBack')} ${user?.displayName || 'user'}`}</Title>
        <Flex gap={10} justify="center">
          <Card style={{ background: 'white' }}>
            <Flex vertical>
              <Flex gap={10} wrap>
                <Link href="/rest-client">
                  <Button icon={<DatabaseOutlined />}>{t('restClient')}</Button>
                </Link>
                <Paragraph type="secondary">{t('makeRequest')}</Paragraph>
              </Flex>
              <Flex gap={10} wrap>
                <Link href="/history">
                  <Button icon={<HistoryOutlined />}>{t('history')}</Button>
                </Link>
                <Paragraph type="secondary">{t('watchRequests')}</Paragraph>
              </Flex>
            </Flex>
          </Card>
          <Card style={{ background: 'white' }}>
            <Flex gap={10} wrap>
              <Paragraph type="secondary">{t('switchAccount')}</Paragraph>
              <Button
                type="primary"
                style={{ background: 'var(--color-accent)' }}
                onClick={logout}
                icon={<LogoutOutlined />}
              >
                {t('logout')}
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
}
