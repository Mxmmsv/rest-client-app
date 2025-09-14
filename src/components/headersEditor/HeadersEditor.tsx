import { CloseSquareFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import React, { useState } from 'react';

import { defaultHeaderValues } from '@/constants/defaultHeaderValues';
import { Header, HeadersEditorProps, HeadersFormValues } from '@/types/headersSectionTypes';

export default function HeadersEditor({ onChange }: Readonly<HeadersEditorProps>) {
  const [options] = useState<{ value: string }[]>(
    Object.keys(defaultHeaderValues).map((header) => ({ value: header }))
  );

  const [form] = Form.useForm<HeadersFormValues>();

  return (
    <>
      <Divider orientation="left">Headers Section</Divider>
      <Form
        form={form}
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
                    <AutoComplete
                      options={options}
                      placeholder="header key"
                      style={{ minWidth: 180 }}
                      allowClear={{ clearIcon: <CloseSquareFilled /> }}
                      filterOption={(input, option) =>
                        (option?.value || '').toLowerCase().includes(input.toLowerCase())
                      }
                      onSelect={(selectedHeader: string) => {
                        const current = form.getFieldValue(['headers', name]) as Header;
                        form.setFieldValue(['headers', name], {
                          ...current,
                          header: selectedHeader.toLowerCase(),
                          value: (defaultHeaderValues[selectedHeader] || '').toLowerCase(),
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Missing header value' }]}
                  >
                    <Input
                      allowClear={{ clearIcon: <CloseSquareFilled /> }}
                      placeholder="header value"
                    />
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
