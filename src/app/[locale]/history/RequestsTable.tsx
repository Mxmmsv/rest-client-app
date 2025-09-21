'use client';

import { Table } from 'antd';
import Link from 'next/link';

import type { RequestHistoryItem } from '@/lib/requests/types';

import type { ColumnsType } from 'antd/es/table';

interface RequestsTableProps {
  history: RequestHistoryItem[];
}

const RequestsTable = ({ history }: RequestsTableProps) => {
  const columns: ColumnsType<RequestHistoryItem> = [
    { title: 'Method', dataIndex: 'method', key: 'method', align: 'center' },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (url, record) => (
        <div style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
          <Link href={`/rest-client?id=${record.id}`}>{url}</Link>
        </div>
      ),
      align: 'center',
    },
    { title: 'Status', dataIndex: 'statusCode', key: 'statusCode', align: 'center' },
    {
      title: 'Latency (ms)',
      dataIndex: 'latency',
      key: 'latency',
      render: (latency: number | null) => (latency !== null ? latency.toFixed(2) : '-'),
      align: 'center',
    },
    {
      title: 'Request Size (bytes)',
      dataIndex: 'requestSize',
      key: 'requestSize',
      align: 'center',
    },
    {
      title: 'Response Size (bytes)',
      dataIndex: 'responseSize',
      key: 'responseSize',
      align: 'center',
    },
    {
      title: 'Error',
      dataIndex: 'error',
      key: 'error',
      render: (error) => error || '-',
      align: 'center',
    },
    {
      title: 'Request Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (ts: Date) => ts.toLocaleString(),
      align: 'center',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={history}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
        style: { margin: '40px 0' },
      }}
    />
  );
};

export default RequestsTable;
