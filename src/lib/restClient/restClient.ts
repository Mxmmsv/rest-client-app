export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface RestClientParams<TBody> {
  method: HttpMethod;
  url: string;
  body?: TBody;
  headers?: Record<string, string>;
}

export interface RestClientResponse<TResponse> {
  data: TResponse;
  status: number;
  statusText: string;
  duration: number;
}

export async function restClient<TResponse, TBody>({
  method,
  url,
  body,
  headers,
}: RestClientParams<TBody>): Promise<RestClientResponse<TResponse>> {
  const startTime = Date.now();
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
