import { Flex, Form, Select, Button } from 'antd';
import { useTranslations } from 'next-intl';

import useCodeGenerator from './useCodeGenerator';

import type { Dispatch, SetStateAction } from 'react';

type CodeGeneratorSectionProps = {
  onGeneratedCode: Dispatch<SetStateAction<string>>;
};

export default function CodeGeneratorSection({
  onGeneratedCode,
}: Readonly<CodeGeneratorSectionProps>) {
  const {
    language,
    variant,
    languageOptions,
    variantOptions,
    setLanguage,
    setVariant,
    handleGenerateCode,
  } = useCodeGenerator();
  const t = useTranslations('CodeGeneratorSection');

  return (
    <Flex justify="center" gap={10}>
      <Form.Item>
        <Select
          placeholder={t('language')}
          style={{ width: 180 }}
          options={languageOptions}
          value={language}
          onChange={(value) => {
            setLanguage(value);
            setVariant(null);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder={t('variant')}
          style={{ width: 180 }}
          options={variantOptions}
          value={variant}
          onChange={setVariant}
          disabled={!language}
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={async () => {
            const code = await handleGenerateCode();
            if (code) onGeneratedCode(code);
          }}
          disabled={!language || !variant}
        >
          {t('generateCode')}
        </Button>
      </Form.Item>
    </Flex>
  );
}
