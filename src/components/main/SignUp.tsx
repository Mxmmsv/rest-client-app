'use client';

import { Button, Card, Flex, Form, Input, Layout, Typography } from 'antd';
import { redirect } from 'next/navigation';
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
      <Flex justify="center" align="center" vertical style={{ height: '100vh' }}>
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
          <Title>Welcome!</Title>
          <Form
            name="signUp"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*\p{L})(?=.*\d)(?=.*[^\p{L}\d]).{8,}$/u,
                  message:
                    'Password must be at least 8 characters long and contain a letter, a number, and a special character.',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Passwords do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { min: 2, message: 'Name must be at least 2 characters long.' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={null} className="flex justify-center">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </Content>
  );
}
