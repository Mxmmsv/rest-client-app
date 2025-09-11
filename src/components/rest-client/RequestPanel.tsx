'use client';

import { Button, Form, Input, Select } from 'antd';

import { type HttpMethod } from '@/lib/restClient/restClient';

type Props = {
  loading: boolean;
  methodColors: Record<HttpMethod, string>;
};

export default function RequestPanel({ loading, methodColors }: Readonly<Props>) {
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
