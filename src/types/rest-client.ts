import { HttpMethod } from '@/lib/restClient/restClient';

export type FormValues = {
  method: HttpMethod;
  URL: string;
  body: string;
};

export type ApiResult = Record<string, unknown> | { error: string };

export type ResponseInfo = {
  status: number | null;
  statusText: string;
  duration: number | null;
};
