'use client';

import { Button, Flex, Form, Input, Select } from 'antd';
import { useState } from 'react';

import CodeEditor from '@/components/CodeSpace';
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

export default function RestClientForm() {
  const [result, setResult] = useState<ApiResult>();
  const [loading, setLoading] = useState(false);
  const [requestBody, setRequestBody] = useState('');

  const onFinish = async (values: { method: HttpMethod; URL: string }) => {
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (requestBody.trim()) {
        try {
          parsedBody = JSON.parse(requestBody);
        } catch {
          setResult({ error: 'Invalid JSON format in request body' });
          setLoading(false);
          return;
        }
      }
      const data = await restClient<ApiResult, unknown>({
        method: values.method,
        url: values.URL,
        body: parsedBody,
      });
      setResult(data);
    } catch (err) {
      setResult({ error: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap="large" align="center">
      <Form
        name="restClientForm"
        layout="inline"
        onFinish={onFinish}
        initialValues={{ method: 'GET', URL: 'https://rickandmortyapi.com/api/character' }}
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
      </Form>

      <CodeEditor value={requestBody} onChange={setRequestBody} height="200px" language="json" />
      <Button>Send</Button>

      <CodeEditor
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height="400px"
        language="json"
      />
    </Flex>
  );
}
