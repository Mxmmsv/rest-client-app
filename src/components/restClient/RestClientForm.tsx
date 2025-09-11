'use client';

import { Button, Flex, Form, Input, Select } from 'antd';
import { Request as PostmanRequest } from 'postman-collection';
import { useState } from 'react';

import CodeGenerate from '@/components/restClient/CodeGenerate';
import { restClient, type HttpMethod } from '@/lib/restClient/restClient';

import ResponseBodySection from './ResponseBodySection';
import { ApiResult } from './types';

const methodColors: Record<HttpMethod, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

export default function RestClientForm() {
  const [form] = Form.useForm();
  const [result, setResult] = useState<ApiResult>();
  const [loading, setLoading] = useState(false);
  const [postmanRequest, setPostmanRequest] = useState<PostmanRequest | null>(null);

  const sendPostmanRequest = (values: { method: HttpMethod; URL: string }) => {
    setPostmanRequest(
      new PostmanRequest({
        url: values.URL,
        method: values.method,
        header: [{ key: 'Authorization', value: 'Bearer token' }],
      })
    );
  };

  const onFinish = async (values: { method: HttpMethod; URL: string }) => {
    setLoading(true);
    try {
      const data = await restClient<ApiResult, ApiResult>({
        method: values.method,
        url: values.URL,
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
        form={form}
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
        <Form.Item>
          <Button
            onClick={() => {
              const values = form.getFieldsValue() as { method: HttpMethod; URL: string };
              sendPostmanRequest(values);
            }}
          >
            Generate code
          </Button>
        </Form.Item>
      </Form>

      <CodeGenerate request={postmanRequest} />
      <ResponseBodySection result={result} titleText="Response:" />
    </Flex>
  );
}
