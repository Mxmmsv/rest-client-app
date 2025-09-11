'use client';

import { Button, Col, Flex, Form, Input, Row, Select } from 'antd';
import { getLanguageList, getOptions, convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';
import { useMemo, useState } from 'react';

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
  const [snippet, setSnippet] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [variant, setVariant] = useState<string>();

  const languages = useMemo(() => getLanguageList(), []);
  const languageOptions = useMemo(
    () => languages.map((l) => ({ label: l.label, value: l.key })),
    [languages]
  );

  const variantOptions = useMemo(() => {
    const lang = languages.find((l) => l.key === language);
    return lang?.variants.map((v) => ({ label: v.key, value: v.key })) || [];
  }, [language, languages]);

  const buildPostmanRequest = (values: { method: HttpMethod; URL: string }) =>
    new PostmanRequest({
      url: values.URL,
      method: values.method,
      header: [{ key: 'Authorization', value: 'Bearer token' }],
    });

  const generateCode = async (
    langKey: string,
    variantKey: string,
    request: PostmanRequest
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const handleConvert = (err2: unknown, snippetCode: string) => {
        if (err2) {
          reject(err2);
        } else {
          resolve(snippetCode);
        }
      };

      const handleOptions = (_err: unknown, opts: Record<string, string | unknown>) => {
        convert(langKey, variantKey, request, opts, handleConvert);
      };

      getOptions(langKey, variantKey, handleOptions);
    });
  };

  const handleGenerateCode = async () => {
    const values = form.getFieldsValue() as { method: HttpMethod; URL: string };
    const request = buildPostmanRequest(values);
    if (language && variant) {
      const code = await generateCode(language, variant, request);
      setSnippet(code);
    }
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
          <Button onClick={handleGenerateCode} disabled={!language || !variant}>
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
              setSnippet(undefined);
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

      <Row>
        <Col span={8}>
          <ResponseBodySection result={snippet} titleText="Code generated:" />
        </Col>
        <Col span={8} offset={8}>
          <ResponseBodySection result={result} titleText="Response:" />
        </Col>
      </Row>
    </Flex>
  );
}
