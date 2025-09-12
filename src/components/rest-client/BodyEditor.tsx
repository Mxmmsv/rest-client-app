'use client';

import { Flex, Form, Select, Typography } from 'antd';
import { FormInstance, useWatch } from 'antd/es/form/Form';

import CodeSpace from '@/components/rest-client/CodeSpace';
import { FormValues } from '@/types/rest-client';

const { Text } = Typography;

type Props = {
  form: FormInstance<FormValues>;
  contentType: 'json' | 'text';
  onContentTypeChange: (type: 'json' | 'text') => void;
};

export default function BodyEditor({ form, contentType, onContentTypeChange }: Readonly<Props>) {
  const bodyValue = useWatch('body', form);

  return (
    <Flex vertical gap="small">
      <Flex align="baseline" justify="end" gap="middle" style={{ width: '95%' }}>
        <Text type="secondary">Content Type:</Text>
        <Select
          value={contentType}
          onChange={onContentTypeChange}
          style={{ width: 90 }}
          options={[
            { value: 'json', label: 'JSON' },
            { value: 'text', label: 'Text' },
          ]}
        />
      </Flex>
      <Form.Item name="body">
        <Flex align="center" justify="center">
          <CodeSpace
            value={bodyValue || ''}
            onChange={(value) => {
              form.setFieldsValue({ body: value });
            }}
            height="200px"
            language="json"
          />
        </Flex>
      </Form.Item>
    </Flex>
  );
}
