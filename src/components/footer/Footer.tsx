import { Col, Flex, Row, Typography } from 'antd';
import Image from 'next/image';
const { Text, Link } = Typography;
import { useTranslations } from 'next-intl';

import TeamAvatars from './TeamAvatars';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: '24px 48px', textAlign: 'center' }}
      gutter={[16, 16]}
    >
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <TeamAvatars />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <Flex wrap gap="small" justify="center" align="center">
          <Text>
            ©{new Date().getFullYear()}, {t('created-by')}
          </Text>
          <Text>&quot;Yet Another Dream Team&#34;</Text>
        </Flex>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Image
            width={35}
            height={35}
            src="/rss-logo.svg"
            alt="Rolling Scopes School Logo"
            style={{ display: 'block', objectFit: 'contain' }}
          />
          <Text>RS School / React</Text>
        </Link>
      </Col>
    </Row>
  );
}
