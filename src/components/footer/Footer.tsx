'use client';

import { Col, Flex, Layout, Row, Typography } from 'antd';
import Image from 'next/image';
const { Text, Link } = Typography;
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/cn';

import TeamAvatars from './TeamAvatars';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <Layout>
      <AntFooter>
        <Row justify="center" align="middle" style={{ textAlign: 'center' }} gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <TeamAvatars />
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Flex wrap gap="small" justify="center" align="center">
              <Text>
                ©{new Date().getFullYear()}, {t('created-by')}
              </Text>
              <Text>&quot;Yet Another Dream Team&quot;</Text>
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
              className={cn(
                'hover:drop-shadow-lg',
                'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]',
                'transition-all duration-300'
              )}
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
      </AntFooter>
    </Layout>
  );
}
