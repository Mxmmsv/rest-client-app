import { CloseSquareFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Divider, Form, Space } from 'antd';
import React, { useMemo } from 'react';

import { defaultHeaderValues } from '@/constants/defaultHeaderValues';

import type { Header, HeadersFormValues } from '../types';

type HeadersEditorProps = {
  setHeaders?: (headers: Record<string, string>) => void;
};

export default function HeadersEditor({ setHeaders }: Readonly<HeadersEditorProps>) {
  const options = useMemo(
    () => Object.keys(defaultHeaderValues).map((header) => ({ value: header })),
    []
  );

  const handleSelect = (name: number, selectedHeader: string) => {
    const current = form.getFieldValue(['headers', name]) as Header;
    form.setFieldValue(['headers', name], {
      ...current,
      header: selectedHeader.toLowerCase(),
      value: (defaultHeaderValues[selectedHeader] || '').toLowerCase(),
    });
  };

  const [form] = Form.useForm<HeadersFormValues>();

  return (
    <>
      <Divider orientation="left">Headers</Divider>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        style={{ minWidth: 250 }}
        autoComplete="off"
        onFinish={(values: HeadersFormValues) => {
          const enabledHeaders = values.headers
            .filter((row) => row.enabled && row.key)
            .reduce<Record<string, string>>((acc, row) => {
              acc[row.key] = row.value || '';
              return acc;
            }, {});

          setHeaders?.(enabledHeaders);
        }}
        initialValues={{
          headers: [{ header: '', value: '', enabled: true }],
        }}
      >
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex' }} align="baseline">
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
                      style={{ minWidth: 150 }}
                      allowClear={{ clearIcon: <CloseSquareFilled /> }}
                      filterOption={(input, option) =>
                        (option?.value || '').toLowerCase().includes(input.toLowerCase())
                      }
                      onSelect={(value) => handleSelect(name, value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[{ required: true, message: 'Missing header value' }]}
                  >
                    <AutoComplete
                      placeholder="header value"
                      style={{ minWidth: 150 }}
                      allowClear={{ clearIcon: <CloseSquareFilled /> }}
                    />
                  </Form.Item>

                  <Button type="text" icon={<DeleteOutlined />} onClick={() => remove(name)} />
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
          <Button type="primary" onClick={() => form.submit()}>
            Use this header(s)
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
