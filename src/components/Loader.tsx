import { Flex, Layout, Spin } from 'antd';
const { Content } = Layout;

export default function Loader() {
  return (
    <Content>
      <Flex justify="center" align="center" vertical style={{ height: '85vh' }}>
        <Spin />
      </Flex>
    </Content>
  );
}
