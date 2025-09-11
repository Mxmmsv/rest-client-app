'use client';

import { Form } from 'antd';
import { FormInstance, useWatch } from 'antd/es/form/Form';

import CodeSpace from '@/components/CodeSpace';
import { FormValues } from '@/types/rest-client';

type Props = {
  form: FormInstance<FormValues>;
};

export default function BodyEditor({ form }: Readonly<Props>) {
  const bodyValue = useWatch('body', form);

  return (
    <Form.Item name="body">
      <CodeSpace
        value={bodyValue || ''}
        onChange={(value) => {
          form.setFieldsValue({ body: value });
        }}
        height="200px"
        language="json"
      />
    </Form.Item>
  );
}
