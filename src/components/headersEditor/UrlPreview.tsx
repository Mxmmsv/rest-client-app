import { CopyOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input } from 'antd';
import { Row } from 'antd/lib';
import { useMemo } from 'react';

import { UrlPreviewProps } from '@/types/headersSectionTypes';

export default function UrlPreview({ endpoint, headers }: Readonly<UrlPreviewProps>) {
  const fullUrl = useMemo(() => {
    const headerParams = Object.entries(headers)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return headerParams ? `${endpoint}?${headerParams}` : endpoint;
  }, [endpoint, headers]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  return (
    <>
      <Divider orientation="left">URL Preview</Divider>
      <Row wrap={false} style={{ gap: '8px' }}>
        <Col flex="auto">
          <Input readOnly placeholder="URL preview" value={fullUrl} />
        </Col>
        <Col flex="none">
          <Button type="text" icon={<CopyOutlined />} onClick={handleCopy} />
        </Col>
      </Row>
    </>
  );
}
