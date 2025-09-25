export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type RestClientParams<TBody> = {
  method: HttpMethod;
  url: string;
  body?: TBody;
  headers?: Record<string, string> | Header[];
};

export type RestClientResponse<TResponse> = {
  data: TResponse;
  status: number;
  statusText: string;
  duration: number;
};

export type ApiResult = Record<string, unknown> | { error: string };

export type FormValues = {
  method: HttpMethod;
  url: string;
  body: string;
  headers: Header[];
};

export type ResponseInfo = {
  status: number | null;
  statusText: string;
  duration: number | null;
};

export type Header = {
  key: string;
  value: string;
  enabled: boolean;
};

export type HeadersFormValues = {
  headers: Header[];
};
