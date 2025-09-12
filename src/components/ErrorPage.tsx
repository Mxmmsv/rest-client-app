'use client';

import { Button, Flex, Result, Typography, Layout, theme } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const { Content } = Layout;
const { Text } = Typography;

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
  className?: string;
}

export default function ErrorPage({ error, reset, className }: Readonly<ErrorPageProps>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations('Messages');

  return (
    <Layout className={className}>
      <Content style={{ padding: '0 48px', margin: '46px 0 0 0' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            borderRadius: borderRadiusLG,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'inherit',
          }}
        >
          <Result
            status="warning"
            title={
              <Flex gap="middle" vertical>
                <Text type="danger">{t('error')}</Text>
                <Text type="danger">{t('retry')}</Text>
              </Flex>
            }
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => (reset ? reset() : window.location.reload())}
              >
                {t('retry-button')}
              </Button>
            }
          />
        </div>
      </Content>
    </Layout>
  );
}
