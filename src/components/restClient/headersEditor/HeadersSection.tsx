import { Col, Row } from 'antd';

import HeadersEditor from './HeadersEditor';
import UrlPreview from './UrlPreview';

export default function HeadersSection() {
  return (
    <Row gutter={[16, 24]} style={{ padding: '0 10px' }}>
      <Col span={24}>
        <HeadersEditor />
      </Col>
      <Col span={24}>
        <UrlPreview />
      </Col>
    </Row>
  );
}
