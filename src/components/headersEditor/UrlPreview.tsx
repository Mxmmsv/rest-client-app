import { CopyOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input } from 'antd';
import { Row } from 'antd/lib';
import { useState, useEffect } from 'react';

import { UrlPreviewProps } from '@/types/headersSectionTypes';

export default function UrlPreview({ endpoint, headers }: Readonly<UrlPreviewProps>) {
  const [fullUrl, setFullUrl] = useState<string>(endpoint);

  useEffect(() => {
    const headerParams = Object.entries(headers)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const urlWithHeaders = headerParams ? `${endpoint}?${headerParams}` : endpoint;
    setFullUrl(urlWithHeaders);
  }, [endpoint, headers]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
  };

  return (
    <Form>
      <Divider orientation="left">URL Preview</Divider>
      <Form.Item name="url">
        <Row wrap={false} style={{ gap: '8px' }}>
          <Col flex="auto">
            <Input readOnly placeholder="URL preview" value={fullUrl} />
          </Col>
          <Col flex="none">
            <Button type="text" icon={<CopyOutlined />} onClick={handleCopy} />
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
