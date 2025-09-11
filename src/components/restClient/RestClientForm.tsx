'use client';

import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';

import { restClient, type HttpMethod } from '@/lib/restClient/restClient';

import ResponseBodySection from './ResponseBodySection';
import useCodeGenerator from './hooks/useCodeGenerator';
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

  const {
    snippet,
    language,
    variant,
    languageOptions,
    variantOptions,
    setLanguage,
    setVariant,
    handleGenerateCode,
  } = useCodeGenerator();

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
        initialValues={{
          method: 'GET',
          URL: 'https://rickandmortyapi.com/api/character',
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
          <Button
            onClick={() => {
              handleGenerateCode(form.getFieldsValue() as { method: HttpMethod; URL: string });
            }}
            disabled={!language || !variant}
          >
            Generate code
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
