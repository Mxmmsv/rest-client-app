import { Flex, Spin } from 'antd';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" className="h-[80vh]">
      <Spin />
    </Flex>
  );
}
