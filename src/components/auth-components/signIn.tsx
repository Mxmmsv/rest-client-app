import { Button, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AuthInfo, logInWithEmailAndPassword, logout } from '@/lib/auth/auth';
import { auth } from '@/lib/auth/firebase.config';

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (user) {
    return (
      <Flex vertical justify="center" align="center">
        <Typography.Title>{`Hi, ${user.displayName}`}</Typography.Title>
        <Typography.Title>You are already loggin!</Typography.Title>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Flex>
    );
  }

  const onFinish = ({ email, password }: AuthInfo) => {
    logInWithEmailAndPassword({ email, password });
  };

  return (
    <Form
      name="signIn"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="on"
    >
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

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
