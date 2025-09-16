import { Col, Row } from 'antd';
import React, { useState } from 'react';

import HeadersEditor from './HeadersEditor';
import UrlPreview from './UrlPreview';

export default function HeadersSection({ endpoint }: Readonly<{ endpoint: string }>) {
  const [headers, setHeaders] = useState<Record<string, string>>({});

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <HeadersEditor setHeaders={setHeaders} />
      </Col>
      <Col span={24}>
        <UrlPreview endpoint={endpoint} headers={headers} />
      </Col>
    </Row>
  );
}
