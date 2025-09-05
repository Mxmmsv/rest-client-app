'use client';

import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';

import Footer from '@/components/footer/Footer';

const { Header, Content } = Layout;

const items = Array.from({ length: 5 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const MainPage: React.FC = () => {
  const { token } = theme.useToken();
  const { colorBgContainer, borderRadiusLG } = token;

  return (
    <Layout className="flex min-h-screen">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }]} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainPage;
