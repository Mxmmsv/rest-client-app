import { Button, Empty, Flex, Space } from 'antd';
import Link from 'next/link';

import { cn } from '@/lib/cn';

function EmptyHistoryPage() {
  return (
    <Flex
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '16px',
        fontSize: '20px',
      }}
    >
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Space size={4}>
        <p>Your request history is empty. Try</p>
        <Link
          href="/rest-client"
          passHref
          className={cn(
            'hover:drop-shadow-lg',
            'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]',
            'transition-all duration-300'
          )}
        >
          <Button
            style={{
              color: '#1b4965',
              fontSize: '20px',
              padding: '0px',
              textDecoration: 'underline',
            }}
            type="link"
          >
            open RESTful Client
          </Button>
        </Link>
      </Space>
    </Flex>
  );
}

export default EmptyHistoryPage;
