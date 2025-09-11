import { Layout, Typography } from 'antd';
import { useState } from 'react';

import { ApiResult, ResponseInfo } from '@/types/rest-client';

import ResponsePanel from '../rest-client/ResponsePanel';

import RestClientForm from './RestClientForm';

const { Title } = Typography;
const { Sider, Content } = Layout;

export default function AuthMain() {
  const [result, setResult] = useState<ApiResult>();
  const [loading, setLoading] = useState(false);
  const [responseInfo, setResponseInfo] = useState<{
    status: number | null;
    statusText: string;
    duration: number | null;
  }>({ status: null, statusText: '', duration: null });

  const handleResponse = (result: ApiResult, info: ResponseInfo) => {
    setResult(result);
    setResponseInfo(info);
  };

  return (
    <Layout style={{ minHeight: '80vh' }}>
      <Sider width="15%">
        <Title level={3}>History & Analytics</Title>
      </Sider>

      <Content>
        <Title level={3}>Request</Title>
        <RestClientForm onResponse={handleResponse} loading={loading} setLoading={setLoading} />
      </Content>

      <Sider width="35%">
        <Title level={3}>Response</Title>
        <ResponsePanel result={result} responseInfo={responseInfo} />
      </Sider>
    </Layout>
  );
}
