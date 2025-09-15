'use client';

import { Flex, Form } from 'antd';
import { useState } from 'react';

import type {
  ApiResult,
  FormValues,
  ResponseInfo,
} from '@/components/rest-client/types/rest-client';
import { restClient } from '@/lib/restClient/restClient';

import BodyEditor from '../rest-client/BodyEditor';
import RequestPanel from '../rest-client/RequestPanel';

type Props = {
  onResponse: (result: ApiResult, info: ResponseInfo) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export default function RestClientForm({ onResponse, loading, setLoading }: Readonly<Props>) {
  const [form] = Form.useForm<FormValues>();
  const [contentType, setContentType] = useState<'json' | 'text'>('json');

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (values.body?.trim()) {
        if (contentType === 'json') {
          try {
            parsedBody = JSON.parse(values.body);
          } catch {
            onResponse(
              { error: 'Invalid JSON format in request body' },
              {
                status: null,
                statusText: '',
                duration: null,
              }
            );
            setLoading(false);
            return;
          }
        } else {
          parsedBody = values.body;
        }
      }

      const response = await restClient<ApiResult, unknown>({
        method: values.method,
        url: values.URL,
        body: parsedBody,
        headers: {
          'Content-Type': contentType === 'json' ? 'application/json' : 'text/plain',
        },
      });

      onResponse(response.data, {
        status: response.status,
        statusText: response.statusText,
        duration: response.duration,
      });
    } catch (err) {
      onResponse(
        { error: (err as Error).message },
        {
          status: null,
          statusText: '',
          duration: null,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap="large" align="center" justify="center">
      <Form
        form={form}
        name="restClientForm"
        layout="vertical"
        onFinish={onFinish}
        style={{ width: '100%' }}
        initialValues={{
          method: 'GET',
          URL: 'https://rickandmortyapi.com/api/character',
          body: '',
        }}
      >
        <Flex gap="middle" align="center" justify="center">
          <RequestPanel loading={loading} />
        </Flex>
        <Form.Item name="body">
          <BodyEditor form={form} contentType={contentType} onContentTypeChange={setContentType} />
        </Form.Item>
      </Form>
    </Flex>
  );
}
