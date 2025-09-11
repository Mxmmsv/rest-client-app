'use client';

import { Flex, Form } from 'antd';

import { restClient, type HttpMethod } from '@/lib/restClient/restClient';
import { ApiResult, FormValues, ResponseInfo } from '@/types/rest-client';

import BodyEditor from '../rest-client/BodyEditor';
import RequestPanel from '../rest-client/RequestPanel';

type Props = {
  onResponse: (result: ApiResult, info: ResponseInfo) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const methodColors: Record<HttpMethod, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

export default function RestClientForm({ onResponse, loading, setLoading }: Readonly<Props>) {
  const [form] = Form.useForm<FormValues>();

  const onFinish = async (values: FormValues) => {
    console.log('Body from form:', values.body);
    setLoading(true);
    try {
      let parsedBody: unknown = undefined;
      if (values.body?.trim()) {
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
      }

      const response = await restClient<ApiResult, unknown>({
        method: values.method,
        url: values.URL,
        body: parsedBody,
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
          <RequestPanel loading={loading} methodColors={methodColors} />
        </Flex>
        <Form.Item name="body">
          <BodyEditor form={form} />
        </Form.Item>
      </Form>
    </Flex>
  );
}
