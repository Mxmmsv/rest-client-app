import { getLanguageList, getOptions, convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';
import { useMemo, useState } from 'react';

import type { HttpMethod } from '@/lib/restClient/restClient';

import type { NotificationInstance } from 'antd/es/notification/interface';

export default function useCodeGenerator(api: NotificationInstance) {
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
    lang: string,
    variant: string,
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
        convert(lang, variant, request, opts, handleConvert);
      };

      getOptions(lang, variant, handleOptions);
    });
  };

  const handleGenerateCode = async ({ method, URL }: { method: HttpMethod; URL: string }) => {
    const values = { method, URL };

    if (!method || !URL) {
      api.warning({ message: 'Please select method and write URL' });
      return null;
    }

    const request = buildPostmanRequest(values);
    if (language && variant) {
      const code = await generateCode(language, variant, request);
      return code;
    }
    return null;
  };

  return {
    language,
    variant,
    languageOptions,
    variantOptions,
    setLanguage,
    setVariant,
    handleGenerateCode,
  };
}
