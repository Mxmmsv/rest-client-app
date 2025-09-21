'use client';

import { Layout } from 'antd';

import Loader from '@/components/Loader';

const { Content } = Layout;

export default function Loading() {
  return (
    <Content
      style={{
        minHeight: 'calc(100vh - 64px - 70px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader />
    </Content>
  );
}
