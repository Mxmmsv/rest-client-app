import { Flex, Select } from 'antd';
import { getLanguageList, getOptions, convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';
import { useState, useMemo } from 'react';

import ResponseBodySection from './ResponseBodySection';

export default function CodeGenerator({ request }: Readonly<{ request: PostmanRequest | null }>) {
  const [language, setLanguage] = useState<string>();
  const [variant, setVariant] = useState<string>();
  const [snippet, setSnippet] = useState<string>('');
  const [error, setError] = useState<string>();

  const languages = useMemo(() => getLanguageList(), []);

  const languageOptions = languages.map((language) => ({
    label: language.label,
    value: language.key,
  }));

  const variantOptions = useMemo(() => {
    const lang = languages.find((l) => l.key === language);
    return (
      lang?.variants.map((v) => ({
        label: v.key,
        value: v.key,
      })) || []
    );
  }, [language, languages]);

  const generateCode = async (langKey: string, variantKey: string) => {
    if (!request || !langKey || !variantKey) {
      setError('Not enough details to generate code');
      return;
    }

    setError('');
    setSnippet('');

    try {
      getOptions(langKey, variantKey, (err, opts) => {
        if (err) {
          setError(String(err));
          return;
        }

        convert(langKey, variantKey, request, opts, (err2, snippetCode) => {
          if (err2) {
            setError(String(err2));
            return;
          }
          setSnippet(snippetCode);
        });
      });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setVariant(undefined);
    setSnippet('');
  };

  const handleVariantChange = (value: string) => {
    setVariant(value);
    generateCode(language || languages[0].label, value);
  };

  return (
    <Flex vertical gap="large" style={{ width: '100%' }}>
      <Flex gap="large">
        <Select
          placeholder="Language"
          style={{ width: 180 }}
          options={languageOptions}
          value={language}
          onChange={handleLanguageChange}
        />
        <Select
          placeholder="Variant"
          style={{ width: 180 }}
          options={variantOptions}
          value={variant}
          onChange={handleVariantChange}
          disabled={!language}
        />
      </Flex>

      <div
        style={{
          width: '100%',
          minHeight: 200,
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 16,
        }}
      >
        <ResponseBodySection result={snippet || error} titleText="Code generated:" />
      </div>
    </Flex>
  );
}
