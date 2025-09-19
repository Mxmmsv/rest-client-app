import { Button, Result, Layout } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

const { Content } = Layout;

function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <Content>
      <Result
        status="404"
        title="404"
        subTitle={t('sorry')}
        extra={
          <Link href="/" passHref>
            <Button type="primary">{t('button-back')}</Button>
          </Link>
        }
      />
    </Content>
  );
}

export default NotFoundPage;
