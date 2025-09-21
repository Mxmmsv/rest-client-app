'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Link from 'next/link';

import type { RequestHistoryItem } from '@/lib/requests/types';

import RequestsTable from './RequestsTable';

export default function HistoryRequestsPage({
  history,
}: Readonly<{ history: RequestHistoryItem[] }>) {
  return (
    <Space
      direction="vertical"
      size="large"
      style={{
        padding: '16px',
        minHeight: '100vh',
      }}
    >
      <Link href="/rest-client" passHref>
        <Button>
          <ArrowLeftOutlined />
          Back to RESTful Client
        </Button>
      </Link>
      <RequestsTable history={history} />
    </Space>
  );
}
