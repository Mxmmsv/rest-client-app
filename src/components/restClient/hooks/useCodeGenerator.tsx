import { getLanguageList, getOptions, convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';
import { useMemo, useState } from 'react';

import { HttpMethod } from '@/lib/restClient/restClient';

export default function useCodeGenerator() {
  const [snippet, setSnippet] = useState<string>();
  const [language, setLanguage] = useState<string>();
  const [variant, setVariant] = useState<string>();

  const languages = useMemo(() => getLanguageList(), []);
  const languageOptions = useMemo(
    () => languages.map((l) => ({ label: l.label, value: l.key })),
    [languages]
  );

  const variantOptions = useMemo(() => {
    const lang = languages.find((l) => l.key === language);
    return lang?.variants.map((v) => ({ label: v.key, value: v.key })) || [];
  }, [language, languages]);

  const buildPostmanRequest = (values: { method: HttpMethod; URL: string }) =>
    new PostmanRequest({
      url: values.URL,
      method: values.method,
      header: [{ key: 'Authorization', value: 'Bearer token' }],
    });

  const generateCode = async (
    langKey: string,
    variantKey: string,
    request: PostmanRequest
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const handleConvert = (err2: unknown, snippetCode: string) => {
        if (err2) {
          reject(err2);
        } else {
          resolve(snippetCode);
        }
      };

      const handleOptions = (_err: unknown, opts: Record<string, string | unknown>) => {
        convert(langKey, variantKey, request, opts, handleConvert);
      };

      getOptions(langKey, variantKey, handleOptions);
    });
  };

  const handleGenerateCode = async ({ method, URL }: { method: HttpMethod; URL: string }) => {
    const values = { method, URL };
    const request = buildPostmanRequest(values);
    if (language && variant) {
      const code = await generateCode(language, variant, request);
      setSnippet(code);
    }
  };

  return {
    snippet,
    language,
    variant,
    languages,
    languageOptions,
    variantOptions,
    setSnippet,
    setLanguage,
    setVariant,
    buildPostmanRequest,
    generateCode,
    handleGenerateCode,
  };
}
