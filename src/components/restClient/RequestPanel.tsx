'use client';

import { Button, Form, Input, Select } from 'antd';

import { type HttpMethod } from '@/lib/restClient/restClient';

type Props = {
  loading: boolean;
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

export default function RequestPanel({ loading }: Readonly<Props>) {
  return (
    <>
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
            <span style={{ color: methodColors[option.value as HttpMethod] }}>{option.label}</span>
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
    </>
  );
}
