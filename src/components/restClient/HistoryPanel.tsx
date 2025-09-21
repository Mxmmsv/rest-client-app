import { Flex, Typography } from 'antd';
import Title from 'antd/es/typography/Title';

const { Text, Link } = Typography;

export default function HistoryPanel() {
  return (
    <>
      <Flex vertical gap="small" justify="center" align="center">
        <Title level={3}>History & Analytics</Title>
        <Text style={{ padding: '16px' }}>
          To view the request history and analytics, click{' '}
          <Link underline href="/history">
            here
          </Link>
          .
        </Text>
      </Flex>
    </>
  );
}
