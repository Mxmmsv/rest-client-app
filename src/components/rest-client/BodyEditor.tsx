'use client';

import { Flex, Form } from 'antd';
import { FormInstance, useWatch } from 'antd/es/form/Form';

import CodeSpace from '@/components/rest-client/CodeSpace';
import { FormValues } from '@/types/rest-client';

type Props = {
  form: FormInstance<FormValues>;
};

export default function BodyEditor({ form }: Readonly<Props>) {
  const bodyValue = useWatch('body', form);

  return (
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
  );
}
