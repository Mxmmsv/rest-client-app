'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { RequestHistoryItem } from '@/lib/requests/types';

import Loader from '../Loader';

const RequestsTable = dynamic(() => import('./RequestsTable'), {
  loading: () => <Loader />,
});

export default function HistoryRequestsPage({
  history,
}: Readonly<{ history: RequestHistoryItem[] }>) {
  const t = useTranslations('HistoryRequestsPage');

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
          {t('backToClient')}
        </Button>
      </Link>
      <RequestsTable history={history} />
    </Space>
  );
}
