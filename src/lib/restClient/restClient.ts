import type { Header } from '@/components/restClient/types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface RestClientParams<TBody> {
  method: HttpMethod;
  url: string;
  body?: TBody;
  headers?: Record<string, string> | Header[];
}

export interface RestClientResponse<TResponse> {
  data: TResponse;
  status: number;
  statusText: string;
  duration: number;
}

function normalizeHeaders(headers?: Record<string, string> | Header[]): Record<string, string> {
  if (!headers) return {};
  if (Array.isArray(headers)) {
    return headers
      .filter((h) => h.enabled && h.key.trim() !== '')
      .reduce<Record<string, string>>((acc, h) => {
        acc[h.key] = h.value;
        return acc;
      }, {});
  }
  return headers;
}

export async function restClient<TResponse, TBody>({
  method,
  url,
  body,
  headers,
}: RestClientParams<TBody>): Promise<RestClientResponse<TResponse>> {
  const startTime = Date.now();

  const normalizedHeaders = normalizeHeaders(headers);
  const options: RequestInit = {
    method,
    headers: normalizedHeaders,
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    if (normalizedHeaders['Content-Type'] === 'text/plain' && typeof body === 'string') {
      options.body = body;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, options);
  const duration = Date.now() - startTime;

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  let data: TResponse;
  try {
    data = (await response.json()) as TResponse;
  } catch {
    data = (await response.text()) as TResponse;
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    duration,
  };
}
