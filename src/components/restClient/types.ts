import type { HttpMethod } from '@/lib/restClient/restClient';

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
