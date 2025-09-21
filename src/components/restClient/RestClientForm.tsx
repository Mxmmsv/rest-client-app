import { Button, Flex, Form, Input, Select, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { restClient, type HttpMethod, type RestClientError } from '@/lib/restClient/restClient';
import {
  getMethod,
  getBody,
  getUrl,
  getHeaders,
} from '@/lib/store/selectors/restClientFormSelectField';
import { setHeader, updateRestClientFormField } from '@/lib/store/slice/restClientFormSlice';

import CodeGeneratorSection from './codeGenerator/CodeGeneratorSection';
import HeadersSection from './headersEditor/HeadersSection';
import BodyEditor from './responseBodyViewer/BodyEditor';
import { replaceVariables } from './utils/variableReplacer';

import type { Variable } from './hooks/useVariables';
import type { ApiResult, FormValues, ResponseInfo } from './types';
import type { Dispatch, SetStateAction } from 'react';

const methodColors: Record<HttpMethod, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

type RestClientFormProps = {
  onResponse: (result: ApiResult, info: ResponseInfo) => void;
  onGeneratedCode: Dispatch<SetStateAction<string>>;
  variables: Variable[];
  currentTheme: string;
  onThemeChange: (theme: string) => void;
};

export default function RestClientForm({
  onResponse,
  onGeneratedCode,
  variables,
  currentTheme,
  onThemeChange,
}: Readonly<RestClientFormProps>) {
  const [form] = Form.useForm<FormValues>();
  const [contentType, setContentType] = useState<'json' | 'text'>('json');
  const dispatch = useDispatch();

  const method = useSelector(getMethod);
  const url = useSelector(getUrl);
  const body = useSelector(getBody);
  const headers = useSelector(getHeaders);

  useEffect(() => {
    form.setFieldsValue({ method, url, body });
  }, [form, method, url, body]);

  const tabItems = [
    {
      key: 'bodyEditorSection',
      label: 'Body editor',
      children: (
        <BodyEditor
          form={form}
          contentType={contentType}
          onContentTypeChange={setContentType}
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />
      ),
    },
    {
      key: 'headersEditorSection',
      label: 'Headers editor',
      children: <HeadersSection />,
    },
    {
      key: 'generateCodeSection',
      label: 'Generate code',
      children: <CodeGeneratorSection onGeneratedCode={onGeneratedCode} />,
    },
  ];

  const handleBody = (values: FormValues): unknown => {
    const headerValue = contentType === 'json' ? 'application/json;charset=utf-8' : 'text/plain';

    dispatch(
      setHeader({
        key: 'Content-Type',
        value: headerValue,
        enabled: true,
      })
    );

    if (!values.body?.trim()) return undefined;

    let processedBody = values.body;
    processedBody = replaceVariables(processedBody, variables);

    if (contentType === 'json') {
      try {
        return JSON.parse(processedBody);
      } catch {
        onResponse(
          { error: 'Invalid JSON format in request body' },
          { status: null, statusText: '', duration: null }
        );
        return undefined;
      }
    }

    return processedBody;
  };

  const handleFinish = async (values: FormValues) => {
    if (values.method !== method) {
      dispatch(updateRestClientFormField({ field: 'method', value: values.method }));
    }
    const processedUrl = replaceVariables(values.url, variables);
    if (processedUrl !== url) {
      dispatch(updateRestClientFormField({ field: 'url', value: processedUrl }));
    }
    if (values.body !== body) {
      dispatch(updateRestClientFormField({ field: 'body', value: values.body }));
    }

    const start = performance.now();

    try {
      const response = await restClient<ApiResult, unknown>({
        method: values.method,
        url: processedUrl,
        body: handleBody(values),
        headers: headers,
      });

      const end = performance.now();
      const latency = end - start;

      const requestSize = values.body ? new TextEncoder().encode(values.body).length : 0;
      const responseSize = response.data
        ? new TextEncoder().encode(JSON.stringify(response.data)).length
        : 0;

      const historyPayload = {
        url: processedUrl,
        method: values.method,
        headers,
        body: values.body || '',
        latency,
        statusCode: response.status,
        requestSize,
        responseSize,
        error: null,
      };

      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyPayload),
        credentials: 'include',
      });

      onResponse(response.data, {
        status: response.status,
        statusText: response.statusText,
        duration: latency,
      });
    } catch (error: unknown) {
      const end = performance.now();
      const latency = end - start;
      const err = error as RestClientError;

      const requestSize = values.body ? new TextEncoder().encode(values.body).length : 0;

      const historyPayload = {
        url: processedUrl,
        method: values.method,
        headers,
        body: values.body ?? null,
        latency,
        statusCode: err.status ?? null,
        requestSize,
        responseSize: 0,
        error: err.message,
      };

      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(historyPayload),
        credentials: 'include',
      });

      onResponse(
        {
          error: err.message,
        },
        {
          status: err.status ?? null,
          statusText: err.statusText ?? 'undefined status error',
          duration: latency,
        }
      );
    }
  };

  return (
    <Flex vertical gap="large">
      <Form
        form={form}
        name="restClientForm"
        onValuesChange={(changedValues: Partial<FormValues>) => {
          Object.entries(changedValues).forEach(([key, value]) => {
            dispatch(updateRestClientFormField({ field: key as keyof FormValues, value }));
          });
        }}
        onFinish={handleFinish}
        initialValues={{ method, url, body }}
        style={{
          width: '100%',
        }}
      >
        <Flex gap="middle" style={{ width: '90%', margin: '0 auto' }}>
          <Form.Item name="method">
            <Select
              style={{ width: '100%', minWidth: 90 }}
              options={Object.keys(methodColors).map((method) => ({
                value: method,
                label: method,
              }))}
              labelRender={(option) => (
                <span style={{ color: methodColors[option?.value as HttpMethod] }}>
                  {option?.label}
                </span>
              )}
              optionRender={(option) => (
                <span style={{ color: methodColors[option.value as HttpMethod] }}>
                  {option.label}
                </span>
              )}
            />
          </Form.Item>

          <Form.Item name="url" style={{ width: '100%' }}>
            <Input placeholder="Enter API URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Flex>
        <Tabs centered items={tabItems} />
      </Form>
    </Flex>
  );
}
