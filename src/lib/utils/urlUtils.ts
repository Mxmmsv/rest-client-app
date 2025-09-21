import type { Header } from '@/components/restClient/types';

export const encodeToBase64 = (str: string): string => {
  return btoa(encodeURIComponent(str));
};

export const decodeFromBase64 = (str: string): string => {
  return decodeURIComponent(atob(str));
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
      try {
        result.url = decodeFromBase64(pathParts[4]);
      } catch (error) {
        console.error('Error decoding URL:', error);
      }
    }

    if (pathParts[5]) {
      try {
        result.body = decodeFromBase64(pathParts[5]);
      } catch (error) {
        console.error('Error decoding body:', error);
      }
    }
  }

  const searchParams = new URLSearchParams(search);
  result.headers = queryParamsToHeaders(searchParams);

  return result;
};
