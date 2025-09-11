'use client';

import { Flex, Form } from 'antd';
import { useState } from 'react';

import { restClient, type HttpMethod } from '@/lib/restClient/restClient';
import { ApiResult, FormValues } from '@/types/rest-client';

import BodyEditor from '../rest-client/BodyEditor';
import RequestPanel from '../rest-client/RequestPanel';
import ResponsePanel from '../rest-client/ResponsePanel';

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
  const [result, setResult] = useState<ApiResult>();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormValues>();

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
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          method: 'GET',
          URL: 'https://rickandmortyapi.com/api/character',
          body: '',
        }}
      >
        <Flex gap="middle" align="flex-start">
          <RequestPanel loading={loading} methodColors={methodColors} />
        </Flex>
        <Form.Item name="body">
          <BodyEditor form={form} />
        </Form.Item>
      </Form>

      <ResponsePanel result={result} responseInfo={responseInfo} />
    </Flex>
  );
}
