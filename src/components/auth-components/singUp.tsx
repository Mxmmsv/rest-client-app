import { Button, Form, Input } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserData, registerWithEmailAndPassword } from '@/lib/auth/auth';
import { auth } from '@/lib/auth/firebase.config';

type FieldType = {
  email?: string;
  password?: string;
  name?: string;
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
    return;
  }

  const onFinish = ({ email, password, name }: UserData) => {
    registerWithEmailAndPassword({ email, password, name });
  };

  return (
    <Form
      name="signUp"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
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

      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: false, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
