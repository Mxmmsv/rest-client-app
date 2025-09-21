import type { FormValues } from '@/components/restClient/types';

import { getMethod, getUrl, getBody, getHeaders } from '../restClientFormSelectField';

describe('restClientForm selectors', () => {
  const mockState: { restClientForm: FormValues } = {
    restClientForm: {
      method: 'POST',
      url: 'https://example.com',
      body: '{ "foo": "bar" }',
      headers: [
        { key: 'Content-Type', value: 'application/json', enabled: true },
        { key: 'Authorization', value: 'Bearer', enabled: false },
      ],
    },
  };

  it('selects method', () => {
    expect(getMethod(mockState)).toBe('POST');
  });

  it('selects url', () => {
    expect(getUrl(mockState)).toBe('https://example.com');
  });

  it('selects body', () => {
    expect(getBody(mockState)).toBe('{ "foo": "bar" }');
  });

  it('selects headers', () => {
    const headers = getHeaders(mockState);
    expect(headers).toHaveLength(2);
    expect(headers[0]).toEqual({
      key: 'Content-Type',
      value: 'application/json',
      enabled: true,
    });
  });
});
