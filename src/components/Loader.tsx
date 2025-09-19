import { Flex, Spin } from 'antd';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" style={{ minHeight: '85vh' }}>
      <Spin />
    </Flex>
  );
}
