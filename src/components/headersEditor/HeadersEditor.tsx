import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import React from 'react';

import { HeadersEditorProps, HeadersFormValues } from '@/types/headersSectionTypes';

export default function HeadersEditor({ onChange }: Readonly<HeadersEditorProps>) {
  return (
    <>
      <Divider orientation="left">Headers Section</Divider>
      <Form
        name="dynamic_form_nest_item"
        style={{ minWidth: 250 }}
        autoComplete="off"
        onFinish={(values: HeadersFormValues) => {
          const enabledHeaders = values.headers
            .filter((row) => row.enabled && row.header)
            .reduce<Record<string, string>>((acc, row) => {
              acc[row.header] = row.value || '';
              return acc;
            }, {});
          console.log('Headers list:', enabledHeaders);
          onChange?.(enabledHeaders);
        }}
        initialValues={{
          headers: [{ header: '', value: '', enabled: true }],
        }}
      >
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'enabled']}
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'header']}
                    rules={[{ required: true, message: 'Missing header key' }]}
                  >
                    <Input placeholder="header key" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Missing header value' }]}
                  >
                    <Input placeholder="header value" />
                  </Form.Item>

                  <DeleteOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ header: '', value: '', enabled: true })}
                  block
                  icon={<PlusOutlined />}
                >
                  Add header
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Use this header(s)
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
