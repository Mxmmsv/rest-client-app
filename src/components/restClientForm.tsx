'use client';

import { Button, Flex, Form, Input, Select } from 'antd';

const methodColors: Record<string, string> = {
  GET: '#6BDD9A',
  POST: '#FFE47E',
  PUT: '#74AEF6',
  PATCH: '#C0A8E1',
  DELETE: '#F79A8E',
  HEAD: '#6BDD9A',
  OPTIONS: '#F15EB0',
};

export default function RestClientForm() {
  const onFinish = () => {
    console.log('aboba');
  };

  return (
    <Flex justify="center" align="center">
      <Form name="restClientForm" onFinish={onFinish}>
        <Flex gap="large">
          <Form.Item>
            <Select
              defaultValue="GET"
              style={{ width: 90 }}
              options={Object.keys(methodColors).map((method) => ({
                value: method,
                label: method,
              }))}
              labelRender={(option) => (
                <span style={{ color: option.value ? methodColors[option.value] : undefined }}>
                  {option.label}
                </span>
              )}
              optionRender={(option) => (
                <span style={{ color: methodColors[option.value as string] }}>{option.label}</span>
              )}
            />
          </Form.Item>
          <Form.Item name="URL">
            <Input placeholder="place api url" />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
}
