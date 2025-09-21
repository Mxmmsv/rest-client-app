'use client';

import { Button, Card, Flex, Form, Input, Layout, Typography } from 'antd';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import type { UserData } from '@/lib/auth/useAuth';
import { useAuth } from '@/lib/auth/useAuth';

import Loader from '../Loader';

const { Title } = Typography;
const { Content } = Layout;

type FieldType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export default function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  const { registerWithEmailAndPassword } = useAuth();
  const t = useTranslations('SignUp');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    redirect('/');
  }

  const onFinish = async ({ email, password, name }: UserData) => {
    await registerWithEmailAndPassword({ email, password, name });
  };

  return (
    <Content>
      <Flex justify="center" align="center" vertical style={{ height: '85vh' }}>
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
          <Title>{t('welcome')}</Title>
          <Form
            name="signUp"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              label={t('email')}
              name="email"
              rules={[
                { required: true, message: t('emailRequired') },
                { type: 'email', message: t('emailInvalid') },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label={t('password')}
              name="password"
              rules={[
                { required: true, message: t('passwordRequired') },
                {
                  pattern: /^(?=.*\p{L})(?=.*\d)(?=.*[^\p{L}\d]).{8,}$/u,
                  message: t('passwordInvalid'),
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label={t('confirmPassword')}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: t('confirmPasswordRequired') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('passwordsMismatch')));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label={t('name')}
              name="name"
              rules={[
                { required: true, message: t('nameRequired') },
                { min: 2, message: t('nameMinLength') },
              ]}
            >
              <Input />
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
