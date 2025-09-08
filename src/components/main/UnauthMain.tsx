import { Button, Flex, Space, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function UnauthMain() {
  return (
    <Flex justify="center" vertical align="center" gap="middle" style={{ height: '80vh' }}>
      <Title>Welcome to Pawstman!</Title>
      <Paragraph style={{ maxWidth: '60vw', textAlign: 'center' }}>
        Pawstman is your lightweight and powerful companion for API development. Send requests,
        inspect responses, and debug effortlessly. Perfect for building, testing, and documenting
        your REST APIs with a clean and intuitive interface.
      </Paragraph>
      <Text strong>Pawstman helps you:</Text>
      <Paragraph>
        • Test APIs with any method (GET, POST, PUT, DELETE)
        <br />• Organize headers and body with a structured editor
        <br />• Save your history for later reference
        <br />• Manage environment variables for dynamic requests
        <br />• Generate code snippets for multiple languages
        <br />• Enjoy a localized interface in multiple languages
      </Paragraph>
      <Space size="middle">
        <Link href="/login">
          <Button size="large" type="primary">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size="large" type="primary">
            Register
          </Button>
        </Link>
      </Space>
    </Flex>
  );
}
