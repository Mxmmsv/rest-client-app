'use client';

import { Layout, Tabs, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { ApiResult, ResponseInfo } from '@/components/restClient/types';

import LeftPanel from '../restClient/LeftPanel';
import { useVariables } from '../restClient/hooks/useVariables';

import RestClientForm from './RestClientForm';
import ResponsePanel from './responseBodyViewer/ResponsePanel';

const { Title } = Typography;
const { Sider, Content } = Layout;

export default function RestClient() {
  const { variables, addVariable, deleteVariable } = useVariables();
  const [currentTheme, setCurrentTheme] = useState('vs');
  const [result, setResult] = useState<ApiResult>();
  const [snippet, setSnippet] = useState<string>('');
  const [responseInfo, setResponseInfo] = useState<ResponseInfo>({
    status: null,
    statusText: '',
    duration: null,
  });
  const t = useTranslations('RestClient');

  const tabItems = [
    {
      key: 'response',
      label: t('response'),
      children: (
        <>
          <Title level={3} style={{ textAlign: 'center' }}>
            {t('response')}
          </Title>
          <ResponsePanel
            result={result}
            responseInfo={responseInfo}
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </>
      ),
    },
    {
      key: 'generatedCode',
      label: t('generatedCode'),
      children: (
        <>
          <Title level={3} style={{ textAlign: 'center' }}>
            {t('generatedCode')}
          </Title>
          <ResponsePanel
            result={snippet}
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
        </>
      ),
    },
  ];

  const handleResponse = (result: ApiResult, info: ResponseInfo) => {
    setResult(result);
    setResponseInfo(info);
  };

  return (
    <Layout style={{ minHeight: '85vh' }}>
      <Sider width="25%">
        <LeftPanel
          variables={variables}
          addVariable={addVariable}
          deleteVariable={deleteVariable}
        />
      </Sider>

      <Content>
        <Title level={3} style={{ textAlign: 'center', marginTop: '10px' }}>
          {t('request')}
        </Title>
        <RestClientForm
          onResponse={handleResponse}
          onGeneratedCode={setSnippet}
          variables={variables}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />
      </Content>

      <Sider width="35%">
        <Tabs centered items={tabItems} />
      </Sider>
    </Layout>
  );
}
