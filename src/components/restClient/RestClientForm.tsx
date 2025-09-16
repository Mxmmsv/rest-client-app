'use client';

import { Flex, Form } from 'antd';
import { useState } from 'react';

import type {
  ApiResult,
  FormValues,
  ResponseInfo,
} from '@/components/restClient/types/rest-client';
import { restClient } from '@/lib/restClient/restClient';

import BodyEditor from './BodyEditor';
import RequestPanel from './RequestPanel';
import { replaceVariables } from './utils/variableReplacer';

import type { Variable } from './hooks/useVariables';

type Props = {
  onResponse: (result: ApiResult, info: ResponseInfo) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  variables: Variable[];
};

export default function RestClientForm({
  onResponse,
  loading,
  setLoading,
  variables,
}: Readonly<Props>) {
  const [form] = Form.useForm<FormValues>();
  const [contentType, setContentType] = useState<'json' | 'text'>('json');

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      console.log('Before replacement - URL:', values.URL);
      console.log('Before replacement - Body:', values.body);
      console.log('Variables:', variables);

      const replacedUrl = replaceVariables(values.URL, variables);
      let replacedBody = replaceVariables(values.body, variables);

      console.log('After replacement - URL:', replacedUrl);
      console.log('After replacement - Body:', replacedBody);

      if (values.body?.trim()) {
        replacedBody = replaceVariables(values.body, variables);
      }

      let parsedBody: unknown = undefined;
      if (replacedBody?.trim()) {
        if (contentType === 'json') {
          try {
            parsedBody = JSON.parse(replacedBody);
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
          parsedBody = replacedBody;
        }
      }

      const response = await restClient<ApiResult, unknown>({
        method: values.method,
        url: replacedUrl,
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
