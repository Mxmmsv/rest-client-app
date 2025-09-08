'use client';

import { Button, Flex, Form, Input, Typography } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';
import { UserData, useAuth } from '@/lib/auth/useAuth';

import Loader from './Loader';

type FieldType = {
  email: string;
  password: string;
  name: string;
};

export default function SignUp() {
  const [user, loading, error] = useAuthState(auth);
  const { registerWithEmailAndPassword } = useAuth();
  const [api, contextHolder] = useNotification();

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
    await registerWithEmailAndPassword({ email, password, name, api });
  };

  return (
    <Flex justify="center" align="center" vertical style={{ height: '100vh' }}>
      {contextHolder}
      <Typography.Title>Welcome!</Typography.Title>
      <Form
        name="signUp"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
    </Flex>
  );
}
