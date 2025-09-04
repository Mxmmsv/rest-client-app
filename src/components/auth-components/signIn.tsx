/* eslint-disable sonarjs/todo-tag */

import { Button, Flex, Form, Input, notification, Typography } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import { logInWithEmailAndPassword, logout } from '@/lib/auth/auth';
import { auth } from '@/lib/auth/firebase.config';

type FieldType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async ({ email, password }: FieldType) => {
    await logInWithEmailAndPassword({ email, password, api });
  };

  const onLogout = () => {
    logout({ api });
  };

  if (loading) {
    //TODO Добавить loader-spinner с тусклым bg
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <Flex vertical justify="center" align="center">
        {contextHolder}
        <Typography.Title>{`Hi, ${user.displayName}`}</Typography.Title>
        <Typography.Title>You are already logged!</Typography.Title>
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
