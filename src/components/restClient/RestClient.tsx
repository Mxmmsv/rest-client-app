'use client';

import { Layout, Tabs, Typography } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import type { ApiResult, Header, ResponseInfo } from '@/components/restClient/types';
import { getHeaders } from '@/lib/store/selectors/restClientFormSelectField';
import {
  removeHeader,
  setHeader,
  updateRestClientFormField,
} from '@/lib/store/slice/restClientFormSlice';

import LeftPanel from '../restClient/LeftPanel';
import { useVariables } from '../restClient/hooks/useVariables';

import RestClientForm from './RestClientForm';
import ResponsePanel from './responseBodyViewer/ResponsePanel';

const { Title } = Typography;
const { Sider, Content } = Layout;

type HistoryData = {
  method: string;
  url: string;
  body?: string | null;
  headers?: Record<string, string>;
};

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

  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const headers: Header[] = useSelector(getHeaders);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/history/${id}`, { credentials: 'include' });
        if (!res.ok) return;

        const data = (await res.json()) as HistoryData;

        dispatch(updateRestClientFormField({ field: 'method', value: data.method }));
        dispatch(updateRestClientFormField({ field: 'url', value: data.url }));
        dispatch(
          updateRestClientFormField({
            field: 'body',
            value: data.body && data.body.length > 0 ? data.body : '',
          })
        );

        const headersLength = headers.length;
        for (let i = 0; i < headersLength; i++) {
          dispatch(removeHeader(0));
        }

        if (data.headers) {
          Object.entries(data.headers).forEach(([key, value]) => {
            dispatch(setHeader({ key, value, enabled: true }));
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load history.';
        toast.error(errorMessage);
      }
    })();
  }, [searchParams, dispatch]);

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
