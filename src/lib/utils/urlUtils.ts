import type { Header } from '@/components/restClient/types';

export const encodeToBase64 = (str: string): string => {
  if (typeof window === 'undefined' && typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }

  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

export const decodeFromBase64 = (str: string): string => {
  try {
    if (typeof window === 'undefined' && typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'base64').toString('utf-8');
    }

    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
};

export const headersToQueryParams = (headers: Header[]): Record<string, string> => {
  const params: Record<string, string> = {};

  headers
    .filter((header) => header.enabled && header.key && header.value)
    .forEach((header) => {
      params[header.key] = encodeURIComponent(header.value);
    });

  return params;
};

export const queryParamsToHeaders = (params: URLSearchParams): Header[] => {
  const headers: Header[] = [];

  params.forEach((value, key) => {
    headers.push({
      key,
      value: decodeURIComponent(value),
      enabled: true,
    });
  });

  return headers;
};

export const buildRestClientUrl = (
  method: string,
  url: string,
  body?: string,
  headers?: Header[]
): string => {
  const encodedUrl = encodeToBase64(url);
  let path = `/rest-client-route/${method}/${encodedUrl}`;

  if (body && method !== 'GET' && method !== 'HEAD' && body.trim() !== '') {
    const encodeBody = encodeToBase64(body);
    path += `/${encodeBody}`;
  }

  const searchParams = new URLSearchParams();
  if (headers) {
    headers
      .filter((header) => header.enabled && header.key && header.value)
      .forEach((header) => {
        searchParams.append(header.key, encodeURIComponent(header.value));
      });
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};

export const parseRestClientUrl = (
  pathname: string,
  search: string
): {
  method?: string;
  url?: string;
  body?: string;
  headers?: Header[];
} => {
  const result: { method?: string; url?: string; body?: string; headers?: Header[] } = {};

  const pathParts = pathname.split('/');
  if (pathParts.length >= 4) {
    result.method = pathParts[3];

    if (pathParts[4]) {
      result.url = decodeFromBase64(pathParts[4]);
    }

    if (pathParts[5]) {
      result.body = decodeFromBase64(pathParts[5]);
    }
  }

  const searchParams = new URLSearchParams(search);
  result.headers = queryParamsToHeaders(searchParams);

  return result;
};
