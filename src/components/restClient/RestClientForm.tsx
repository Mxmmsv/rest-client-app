'use client';

import { Button, Flex, Form, Input, Select, Tabs } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { restClient, type HttpMethod } from '@/lib/restClient/restClient';
import { getMethod, getBody, getUrl } from '@/lib/store/selectors/restClientFormSelectField';
import { updateRestClientFormField } from '@/lib/store/slice/restClientFormSlice';

import CodeGeneratorSection from './codeGenerator/CodeGeneratorSection';
import HeadersSection from './headersEditor/HeadersSection';
import BodyEditor from './responseBodyViewer/BodyEditor';

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
};

export default function RestClientForm({
  onResponse,
  onGeneratedCode,
}: Readonly<RestClientFormProps>) {
  const [form] = Form.useForm<FormValues>();
  const [contentType, setContentType] = useState<'json' | 'text'>('json');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const method = useSelector(getMethod);
  const url = useSelector(getUrl);
  const body = useSelector(getBody);

  const tabItems = [
    {
      key: 'generatecodesection',
      label: 'Generate code',
      children: <CodeGeneratorSection onGeneratedCode={onGeneratedCode} />,
    },
    {
      key: 'headerseditor',
      label: 'Headers editor',
      children: <HeadersSection endpoint={Form.useWatch('url', form)} />,
    },
  ];

  const handleBody = (values: FormValues) => {
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (values.body?.trim()) {
        if (contentType === 'json') {
          try {
            parsedBody = JSON.parse(values.body);
            return parsedBody;
          } catch {
            onResponse(
              { error: 'Invalid JSON format in request body' },
              { status: null, statusText: '', duration: null }
            );
            setLoading(false);
            return;
          }
        } else {
          parsedBody = values.body;
          return parsedBody;
        }
      }
    } catch (err) {
      const errorResult = { error: (err as Error).message };
      onResponse(errorResult, { status: null, statusText: '', duration: null });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (values: FormValues) => {
    if (values.method !== method) {
      dispatch(updateRestClientFormField({ field: 'method', value: values.method }));
    }
    if (values.url !== url) {
      dispatch(updateRestClientFormField({ field: 'url', value: values.url }));
    }
    if (values.body !== body) {
      dispatch(updateRestClientFormField({ field: 'body', value: values.body }));
    }

    const response = await restClient<ApiResult, unknown>({
      method: values.method,
      url: values.url,
      body: handleBody(values),
      headers: {
        'Content-Type': contentType === 'json' ? 'application/json' : 'text/plain',
      },
    });

    onResponse(response.data, {
      status: response.status,
      statusText: response.statusText,
      duration: response.duration,
    });
  };

  return (
    <Flex vertical gap="large" align="center">
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
      >
        <Flex gap="middle" align="center" justify="center" wrap>
          <Form.Item name="method">
            <Select
              style={{ width: 110 }}
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

          <Form.Item name="url" style={{ minWidth: 400 }}>
            <Input placeholder="Enter API URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send
            </Button>
          </Form.Item>
        </Flex>
        <Tabs centered items={tabItems} />

        <BodyEditor form={form} contentType={contentType} onContentTypeChange={setContentType} />
      </Form>
    </Flex>
  );
}
