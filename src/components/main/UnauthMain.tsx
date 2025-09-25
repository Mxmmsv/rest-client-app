import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Space, Typography } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import AboutSection from '../about/AboutSection';

const { Title, Paragraph, Text } = Typography;

export default function UnauthMain() {
  const t = useTranslations('UnauthMain');
  return (
    <Flex justify="space-between" vertical align="center" gap="80px">
      <Flex justify="center" vertical align="center" gap="small">
        <Title>{t('welcome')} Pawstman!</Title>
        <Paragraph style={{ maxWidth: '60vw', textAlign: 'center' }}>{t('subtitle')}</Paragraph>
        <Flex justify="space-around" align="end" gap="large">
          <Flex justify="center" vertical gap="small">
            <Text strong>{t('helpsHeader')}</Text>
            <Paragraph>
              • {t('feature1')}
              <br />• {t('feature2')}
              <br />• {t('feature3')}
              <br />• {t('feature4')}
              <br />• {t('feature5')}
              <br />• {t('feature6')}
            </Paragraph>
          </Flex>
          <Card
            style={{
              width: '25%',
              minWidth: '255px',
              textAlign: 'center',
              backgroundColor: 'transparent',
              border: 'solid var(--color-additional-light)',
              boxShadow: '0 4px 10px var(--color-additional)',
            }}
          >
            <Title level={4}>{t('getStarted')}</Title>
            <Paragraph type="secondary">
              {t('existingAccount')} <br />
            </Paragraph>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Link href="/login">
                <Button
                  size="large"
                  icon={<UserOutlined />}
                  block
                  style={{ justifyContent: 'center' }}
                >
                  {t('signIn')}
                </Button>
              </Link>
              <Text type="secondary">{t('or')}</Text>
              <Link href="/register" style={{ width: '100%' }}>
                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  block
                  style={{ justifyContent: 'center' }}
                >
                  {t('createNew')}
                </Button>
              </Link>
            </Space>
          </Card>
        </Flex>
      </Flex>
      <AboutSection />
    </Flex>
  );
}
