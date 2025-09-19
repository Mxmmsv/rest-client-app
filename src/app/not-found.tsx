import { Button, Result } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
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
  );
}

export default NotFoundPage;
