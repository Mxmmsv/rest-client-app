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
        <Paragraph style={{ maxWidth: '60vw', textAlign: 'center' }}>
          Pawstman is your lightweight and powerful companion for API development. Send requests,
          inspect responses, and debug effortlessly. Perfect for building, testing, and documenting
          your REST APIs with a clean and intuitive interface.
        </Paragraph>
        <Flex justify="space-around" align="end" gap="large">
          <Flex justify="center" vertical gap="small">
            <Text strong>Pawstman helps you:</Text>
            <Paragraph>
              • Test APIs with any method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
              <br />• Organize headers and body with a structured editor
              <br />• Save your history for later reference
              <br />• Manage environment variables for dynamic requests
              <br />• Generate code snippets for multiple languages
              <br />• Enjoy localized interface in English and Russian
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
            <Title level={4}>Get Started</Title>
            <Paragraph type="secondary">
              Already have an account? <br />
              Sign in or create a new one to start testing APIs
            </Paragraph>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Link href="/login">
                <Button
                  size="large"
                  icon={<UserOutlined />}
                  block
                  style={{ justifyContent: 'center' }}
                >
                  Sign In to Existing Account
                </Button>
              </Link>
              <Text type="secondary">or</Text>
              <Link href="/register" style={{ width: '100%' }}>
                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  block
                  style={{ justifyContent: 'center' }}
                >
                  Create New Account
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
