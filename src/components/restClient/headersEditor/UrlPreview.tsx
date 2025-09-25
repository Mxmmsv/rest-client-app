import { CopyOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getHeaders, getMethod, getUrl } from '@/lib/store/selectors/restClientFormSelectField';

export default function UrlPreview() {
  const url = useSelector(getUrl);
  const method = useSelector(getMethod);
  const headers = useSelector(getHeaders);
  const t = useTranslations('UrlPreview');

  const fullUrl = useMemo(() => {
    const headerParams = headers
      .filter((h) => h.enabled && h.key && h.value)
      .map((h) => `${encodeURIComponent(h.key)}=${encodeURIComponent(h.value)}`)
      .join('&');
    return headerParams ? `${url}/${method}?${headerParams.toLowerCase()}` : url;
  }, [url, method, headers]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.info(t('copied'));
  };

  return (
    <Flex vertical>
      <Divider orientation="left">{t('urlPreview')}</Divider>
      <Flex>
        <Input readOnly placeholder={t('placeholder')} value={url ? fullUrl : ''} />
        <Button type="text" icon={<CopyOutlined />} onClick={handleCopy} />
      </Flex>
    </Flex>
  );
}
