'use client';

import { Button, Card, Flex, Form, Input, Layout } from 'antd';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

import Loader from '../Loader';

type FieldType = {
  email: string;
  password: string;
};

const { Content } = Layout;

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const { logInWithEmailAndPassword } = useAuth();
  const t = useTranslations('SignIn');

  const onFinish = async ({ email, password }: FieldType) => {
    await logInWithEmailAndPassword({ email, password });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    redirect('/');
  }

  return (
    <Content>
      <Flex justify="center" align="center" vertical style={{ height: '75vh' }}>
        <Card
          style={{
            width: '50%',
            textAlign: 'center',
            backgroundColor: 'transparent',
            border: 'solid var(--color-additional-light)',
            boxShadow: '0 4px 10px var(--color-additional)',
            padding: '50px ',
          }}
        >
          <Form name="signIn" layout="vertical" labelCol={{ span: 8 }} onFinish={onFinish}>
            <Form.Item<FieldType>
              label={t('email')}
              name="email"
              rules={[{ required: true, message: t('emailRequired') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t('password')}
              name="password"
              rules={[{ required: true, message: t('passwordRequired') }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null} className="flex justify-center">
              <Button type="primary" htmlType="submit">
                {t('submit')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </Content>
  );
}
