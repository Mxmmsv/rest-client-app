'use client';

import { Layout, Typography } from 'antd';

const { Title } = Typography;

export default function HistoryStub() {
  return (
    <Layout style={{ minHeight: '85vh' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        History
      </Title>
    </Layout>
  );
}
