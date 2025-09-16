'use client';

import { Button, Col, Flex, Form, Input, Row, Select, notification } from 'antd';
import { useState } from 'react';

import type {
  ApiResult,
  FormValues,
  ResponseInfo,
} from '@/components/restClient/types/rest-client';
import { restClient, type HttpMethod } from '@/lib/restClient/restClient';

import BodyEditor from './BodyEditor';
import ResponseBodySection from './ResponseBodySection';
import useCodeGenerator from './hooks/useCodeGenerator';

const methodColors: Record<HttpMethod, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

type Props = {
  onResponse: (result: ApiResult, info: ResponseInfo) => void;
};

export default function RestClientForm({ onResponse }: Readonly<Props>) {
  const [form] = Form.useForm<FormValues>();
  const [contentType, setContentType] = useState<'json' | 'text'>('json');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult>();

  const [api, contextHolder] = notification.useNotification();

  const {
    snippet,
    language,
    variant,
    languageOptions,
    variantOptions,
    setLanguage,
    setVariant,
    handleGenerateCode,
  } = useCodeGenerator(api);

  const onFinish = async (values: FormValues & { method: HttpMethod; URL: string }) => {
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
              { status: null, statusText: '', duration: null }
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

      setResult(response.data);
      onResponse(response.data, {
        status: response.status,
        statusText: response.statusText,
        duration: response.duration,
      });
    } catch (err) {
      const errorResult = { error: (err as Error).message };
      setResult(errorResult);
      onResponse(errorResult, { status: null, statusText: '', duration: null });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex vertical gap="large" align="center">
      {contextHolder}
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
        style={{ width: '100%' }}
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

          <Form.Item name="URL" style={{ minWidth: 400 }}>
            <Input placeholder="Enter API URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send
            </Button>
          </Form.Item>

          <Form.Item>
            <Select
              placeholder="Language"
              style={{ width: 180 }}
              options={languageOptions}
              value={language}
              onChange={(value) => {
                setLanguage(value);
                setVariant(undefined);
              }}
            />
          </Form.Item>

          <Form.Item>
            <Select
              placeholder="Variant"
              style={{ width: 180 }}
              options={variantOptions}
              value={variant}
              onChange={(value) => setVariant(value)}
              disabled={!language}
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={() => {
                handleGenerateCode(form.getFieldsValue() as { method: HttpMethod; URL: string });
              }}
              disabled={!language || !variant}
            >
              Generate code
            </Button>
          </Form.Item>
        </Flex>

        <Form.Item name="body">
          <BodyEditor form={form} contentType={contentType} onContentTypeChange={setContentType} />
        </Form.Item>
      </Form>

      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <ResponseBodySection result={result} titleText="Response:" />
        </Col>
        <Col span={12}>
          <ResponseBodySection result={snippet} titleText="Code generated:" />
        </Col>
      </Row>
    </Flex>
  );
}
