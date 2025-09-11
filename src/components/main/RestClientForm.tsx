'use client';

import { Button, Flex, Form, Input, Select } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useState } from 'react';

import CodeSpace from '@/components/CodeSpace';
import { restClient, type HttpMethod } from '@/lib/restClient/restClient';

const methodColors: Record<HttpMethod, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

type ApiResult = Record<string, string> | { error: string };
type FormValues = {
  method: HttpMethod;
  URL: string;
  body: string;
};

export default function RestClientForm() {
  const [result, setResult] = useState<ApiResult>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const bodyValue = useWatch('body', form);

  const [responseInfo, setResponseInfo] = useState<{
    status: number | null;
    statusText: string;
    duration: number | null;
  }>({ status: null, statusText: '', duration: null });

  const onFinish = async (values: FormValues) => {
    console.log('Body from form:', values.body);
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (values.body?.trim()) {
        try {
          parsedBody = JSON.parse(values.body);
        } catch {
          setResult({ error: 'Invalid JSON format in request body' });
          setLoading(false);
          return;
        }
      }

      const response = await restClient<ApiResult, unknown>({
        method: values.method,
        url: values.URL,
        body: parsedBody,
      });

      setResult(response.data);
      setResponseInfo({
        status: response.status,
        statusText: response.statusText,
        duration: response.duration,
      });
    } catch (err) {
      setResult({ error: (err as Error).message });
      setResponseInfo({ status: null, statusText: '', duration: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap="large" align="center">
      <Form
        form={form}
        name="restClientForm"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
          method: 'GET',
          URL: 'https://rickandmortyapi.com/api/character',
          body: '',
        }}
      >
        <Form.Item name="method">
          <Select
            style={{ width: 110 }}
            options={Object.keys(methodColors).map((method) => ({
              value: method,
              label: method,
            }))}
            labelRender={(option) => (
              <span
                style={{
                  color: option?.value ? methodColors[option.value as HttpMethod] : undefined,
                }}
              >
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

        <Form.Item name="URL" style={{ minWidth: 400 }}>
          <Input placeholder="Enter API URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send
          </Button>
        </Form.Item>

        <Form.Item name="body">
          <CodeSpace
            value={bodyValue || ''}
            onChange={(value) => {
              form.setFieldsValue({ body: value });
            }}
            height="200px"
            language="json"
          />
        </Form.Item>
      </Form>

      {responseInfo.status && (
        <div>
          Status: {responseInfo.status} {responseInfo.statusText}
          {responseInfo.duration && ` | Time: ${responseInfo.duration}ms`}
        </div>
      )}

      <CodeSpace
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height="400px"
        language="json"
      />
    </Flex>
  );
}
