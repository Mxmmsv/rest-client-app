export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface RestClientParams<TBody> {
  method: HttpMethod;
  url: string;
  body?: TBody;
  headers?: Record<string, string>;
}

export async function restClient<TResponse, TBody>({
  method,
  url,
  body,
  headers,
}: RestClientParams<TBody>): Promise<TResponse> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  try {
    return (await response.json()) as TResponse;
  } catch {
    return (await response.text()) as TResponse;
  }
}
