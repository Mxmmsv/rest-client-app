import { SmileOutlined } from '@ant-design/icons';
import { Empty, Flex } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';

function EmptyHistoryPage() {
  const t = useTranslations('EmptyHistoryPage');

  return (
    <Flex
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '16px',
        fontSize: '20px',
      }}
    >
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <p>{t('noRequests')}</p>
      <Link
        href="/rest-client"
        passHref
        className={cn(
          'hover:drop-shadow-lg',
          'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]',
          'transition-all duration-300'
        )}
        style={{
          color: '#1b4965',
          fontSize: '20px',
          padding: '0px',
          textDecoration: 'underline',
        }}
      >
        {t('restClient')}
      </Link>
      <SmileOutlined style={{ fontSize: 20 }} />
    </Flex>
  );
}

export default EmptyHistoryPage;
