import { Layout, Typography } from 'antd';
import { useState } from 'react';

import type { ApiResult, ResponseInfo } from '@/components/restClient/types/rest-client';

import LeftPanel from '../restClient/LeftPanel';
import ResponsePanel from '../restClient/ResponsePanel';
import RestClientForm from '../restClient/RestClientForm';
import { useVariables } from '../restClient/hooks/useVariables';

const { Title } = Typography;
const { Sider, Content } = Layout;

export default function AuthMain() {
  const { variables, addVariable, deleteVariable } = useVariables();
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
      <Sider width="25%">
        <LeftPanel
          variables={variables}
          addVariable={addVariable}
          deleteVariable={deleteVariable}
        />
      </Sider>

      <Content>
        <Title level={3}>Request</Title>
        <RestClientForm
          onResponse={handleResponse}
          loading={loading}
          setLoading={setLoading}
          variables={variables}
        />
      </Content>

      <Sider width="35%">
        <Title level={3}>Response</Title>
        <ResponsePanel result={result} responseInfo={responseInfo} />
      </Sider>
    </Layout>
  );
}
