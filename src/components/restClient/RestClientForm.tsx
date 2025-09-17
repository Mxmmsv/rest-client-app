import { Button, Flex, Form, Input, Select, Tabs } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { restClient, type HttpMethod } from '@/lib/restClient/restClient';
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
  const dispatch = useDispatch();

  const method = useSelector(getMethod);
  const url = useSelector(getUrl);
  const body = useSelector(getBody);
  const headers = useSelector(getHeaders);

  const tabItems = [
    {
      key: 'bodyEditorSection',
      label: 'Body editor',
      children: (
        <BodyEditor form={form} contentType={contentType} onContentTypeChange={setContentType} />
      ),
    },
    {
      key: 'headerseditor',
      label: 'Headers editor',
      children: <HeadersSection />,
    },
    {
      key: 'generatecodesection',
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

    if (contentType === 'json') {
      try {
        return JSON.parse(values.body);
      } catch {
        onResponse(
          { error: 'Invalid JSON format in request body' },
          { status: null, statusText: '', duration: null }
        );
        return undefined;
      }
    }

    return values.body;
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
      headers: headers,
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
