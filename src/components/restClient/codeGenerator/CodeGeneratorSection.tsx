import { Flex, Form, Select, Button } from 'antd';

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

  return (
    <Flex>
      <Form.Item>
        <Select
          placeholder="Language"
          style={{ width: 180 }}
          options={languageOptions}
          value={language}
          onChange={(value) => {
            setLanguage(value);
            setVariant(undefined);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Variant"
          style={{ width: 180 }}
          options={variantOptions}
          value={variant}
          onChange={(value) => setVariant(value)}
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
          Generate code
        </Button>
      </Form.Item>
    </Flex>
  );
}
