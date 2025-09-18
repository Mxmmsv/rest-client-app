import { Layout, Tabs, Typography } from 'antd';
import { useState } from 'react';

import type { ApiResult, ResponseInfo } from '@/components/restClient/types';

import RestClientForm from './RestClientForm';
import ResponsePanel from './responseBodyViewer/ResponsePanel';

const { Title } = Typography;
const { Sider, Content } = Layout;

export default function RestClient() {
  const [result, setResult] = useState<ApiResult>();
  const [snippet, setSnippet] = useState<string>('');
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
      key: 'generatedCode',
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
        <RestClientForm onResponse={handleResponse} onGeneratedCode={setSnippet} />
      </Content>

      <Sider width="35%">
        <Tabs centered items={tabItems} />
      </Sider>
    </Layout>
  );
}
