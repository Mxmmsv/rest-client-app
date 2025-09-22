'use client';

import { Table } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { RequestHistoryItem } from '@/lib/requests/types';

import Loader from '../Loader';

import type { ColumnsType } from 'antd/es/table';

interface RequestsTableProps {
  history: RequestHistoryItem[];
}

const LocalizedDate = dynamic(() => import('./LocalizedDate'), {
  ssr: false,
  loading: () => <Loader />,
});

const RequestsTable = ({ history }: RequestsTableProps) => {
  const t = useTranslations('RequestsTable');

  const columns: ColumnsType<RequestHistoryItem> = [
    { title: t('method'), dataIndex: 'method', key: 'method', align: 'center' },
    {
      title: t('url'),
      dataIndex: 'url',
      key: 'url',
      render: (url, record) => (
        <div style={{ wordBreak: 'break-all', whiteSpace: 'normal' }}>
          <Link href={`/rest-client?id=${record.id}`}>{url}</Link>
        </div>
      ),
      align: 'center',
    },
    { title: t('status'), dataIndex: 'statusCode', key: 'statusCode', align: 'center' },
    {
      title: t('latency'),
      dataIndex: 'latency',
      key: 'latency',
      render: (latency: number | null) => (latency !== null ? latency.toFixed(2) : '-'),
      align: 'center',
    },
    {
      title: t('requestSize'),
      dataIndex: 'requestSize',
      key: 'requestSize',
      align: 'center',
    },
    {
      title: t('responseSize'),
      dataIndex: 'responseSize',
      key: 'responseSize',
      align: 'center',
    },
    {
      title: t('error'),
      dataIndex: 'error',
      key: 'error',
      render: (error) => error || t('noError'),
      align: 'center',
    },
    {
      title: t('requestTime'),
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (ts: Date) => <LocalizedDate date={ts} />,
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
        showTotal: (total, range) =>
          t('paginationTotal', {
            from: range[0],
            to: range[1],
            total,
          }),
        style: { margin: '40px 0' },
      }}
    />
  );
};

export default RequestsTable;
