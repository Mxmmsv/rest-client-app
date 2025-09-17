import { getLanguageList, getOptions, convert } from 'postman-code-generators';
import { Request as PostmanRequest } from 'postman-collection';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getMethod,
  getBody,
  getUrl,
  getHeaders,
} from '@/lib/store/selectors/restClientFormSelectField';

import type { FormValues } from '../types';

export default function useCodeGenerator() {
  const [language, setLanguage] = useState<string>();
  const [variant, setVariant] = useState<string>();

  const method = useSelector(getMethod);
  const url = useSelector(getUrl);
  const body = useSelector(getBody);
  const headers = useSelector(getHeaders);

  const languages = useMemo(() => getLanguageList(), []);
  const languageOptions = useMemo(
    () => languages.map((l) => ({ label: l.label, value: l.key })),
    [languages]
  );

  const variantOptions = useMemo(() => {
    const lang = languages.find((l) => l.key === language);
    return lang?.variants.map((v) => ({ label: v.key, value: v.key })) || [];
  }, [language, languages]);

  const buildPostmanRequest = (values: FormValues) =>
    new PostmanRequest({
      url: values.url,
      method: values.method,
      header: values.headers.filter((h) => h.enabled).map((h) => ({ key: h.key, value: h.value })),
      body: ['GET', 'HEAD', 'OPTIONS'].includes(values.method)
        ? undefined
        : { mode: 'raw', raw: values.body },
    });

  const generateCode = async (
    lang: string,
    variant: string,
    request: PostmanRequest
  ): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const handleConvert = (err: unknown, snippetCode: string) => {
        if (err) reject(err);
        else resolve(snippetCode);
      };

      getOptions(lang, variant, (_err, opts) => {
        convert(lang, variant, request, opts, handleConvert);
      });
    });
  };

  const handleGenerateCode = async () => {
    const values: FormValues = { url, method, body, headers };

    // if (!method || !URL) {
    //   api.warning({ message: 'Please select method and write URL' });
    //   return null;
    // }

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
