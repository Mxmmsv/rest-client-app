import { Layout, Tabs, Typography } from 'antd';
import { useState } from 'react';

import type { ApiResult, ResponseInfo } from '@/components/restClient/types';

import ResponsePanel from '../restClient/ResponsePanel';
import RestClientForm from '../restClient/RestClientForm';

const { Title } = Typography;
const { Sider, Content } = Layout;

export default function AuthMain() {
  const [result, setResult] = useState<ApiResult>();
  const [snippet, setsnippet] = useState<string>('');
  const [responseInfo, setResponseInfo] = useState<ResponseInfo>({
    status: null,
    statusText: '',
    duration: null,
  });

  const tabItems = [
    {
      key: 'response',
      label: 'Response',
      children: (
        <>
          <Title level={3} style={{ textAlign: 'center' }}>
            Response
          </Title>
          <ResponsePanel result={result} responseInfo={responseInfo} />
        </>
      ),
    },
    {
      key: 'generatedcode',
      label: 'Generated Code',
      children: (
        <>
          <Title level={3} style={{ textAlign: 'center' }}>
            Generated Code
          </Title>
          <ResponsePanel result={snippet} />
        </>
      ),
    },
  ];

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
        <Title level={3} style={{ textAlign: 'center' }}>
          Request
        </Title>
        <RestClientForm onResponse={handleResponse} onGeneratedCode={setsnippet} />
      </Content>

      <Sider width="35%">
        <Tabs centered items={tabItems} />
      </Sider>
    </Layout>
  );
}
