'use server';

import type { Header, RestClientParams, RestClientResponse } from '@/components/restClient/types';

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
}: RestClientParams<TBody>): Promise<RestClientResponse<TResponse> & { error?: string }> {
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

  const startTime = Date.now();

  try {
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    let data: TResponse;
    try {
      data = (await response.json()) as TResponse;
    } catch {
      data = (await response.text()) as unknown as TResponse;
    }

    if (!response.ok) {
      return {
        data,
        status: response.status,
        statusText: response.statusText,
        duration,
        error: `Request failed with status ${response.status}`,
      };
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      duration,
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      data: null as unknown as TResponse,
      status: 0,
      statusText: 'Network error',
      duration: 0,
      error: error.message,
    };
  }
}
