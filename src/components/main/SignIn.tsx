'use client';

import { Button, Flex, Form, Input } from 'antd';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

import Loader from '../Loader';

type FieldType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const { logInWithEmailAndPassword } = useAuth();

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
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Form name="signIn" labelCol={{ span: 8 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
