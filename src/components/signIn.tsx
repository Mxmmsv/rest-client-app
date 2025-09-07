'use client';

import { Button, Flex, Form, Input, Typography, Spin } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { useAuth } from '@/lib/auth/useAuth';

type FieldType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const [api, contextHolder] = useNotification();
  const { logInWithEmailAndPassword, logout } = useAuth();

  const onFinish = async ({ email, password }: FieldType) => {
    await logInWithEmailAndPassword({ email, password, api }).then(redirect('/'));
  };

  const onLogout = () => {
    logout({ api });
  };

  if (loading) {
    return (
      <Flex vertical justify="center" align="center">
        <Spin />
      </Flex>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <Flex vertical justify="center" align="center">
        {contextHolder}
        <Typography.Title>{`Hi, ${user.displayName || 'user'}`}</Typography.Title>
        <Typography.Title level={2}>You are already logged!</Typography.Title>
        <Button type="primary" onClick={onLogout}>
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex justify="center" align="center">
      {contextHolder}

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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
