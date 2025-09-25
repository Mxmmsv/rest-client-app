import { FormOutlined } from '@ant-design/icons';
import { Button, Flex, Form, message, Select, Typography } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import { useTranslations } from 'next-intl';

import CodeSpace from './CodeSpace';

import type { FormValues, ResponseInfo } from '../types';
import type { FormInstance } from 'antd/es/form/Form';

const { Text } = Typography;

type Props = {
  form: FormInstance<FormValues>;
  contentType: 'json' | 'text';
  onContentTypeChange: (type: 'json' | 'text') => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  responseInfo: ResponseInfo;
};

export default function BodyEditor({
  form,
  contentType,
  onContentTypeChange,
  currentTheme,
  onThemeChange,
  responseInfo,
}: Readonly<Props>) {
  const bodyValue = useWatch('body', form);
  const t = useTranslations('BodyEditor');

  const handleFormat = () => {
    if (contentType === 'json' && bodyValue) {
      try {
        const parsed: unknown = JSON.parse(bodyValue);
        const formatted = JSON.stringify(parsed, null, 2);
        form.setFieldsValue({ body: formatted });
      } catch {
        message.error(t('invalidJson'));
      }
    }
  };

  return (
    <Flex vertical gap="small">
      <Flex align="baseline" justify="end" gap="middle" style={{ width: '95%' }}>
        <Text type="secondary">{t('contentType')}</Text>
        {contentType === 'json' && (
          <Button
            onClick={handleFormat}
            icon={<FormOutlined />}
            size="small"
            title={t('formatJson')}
          />
        )}
        <Select
          value={contentType}
          onChange={onContentTypeChange}
          style={{ width: 90 }}
          options={[
            { value: 'json', label: t('json') },
            { value: 'text', label: t('text') },
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
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
            responseInfo={responseInfo}
          />
        </Flex>
      </Form.Item>
    </Flex>
  );
}
