import type { Header } from '@/components/restClient/types';

import {
  encodeToBase64,
  decodeFromBase64,
  headersToQueryParams,
  queryParamsToHeaders,
  buildRestClientUrl,
  parseRestClientUrl,
} from '../urlUtils';

describe('urlUtils', () => {
  describe('encodeToBase64 and decodeFromBase64', () => {
    it('should encode and decode string correctly', () => {
      const original = 'hello world!@#$';
      const encoded = encodeToBase64(original);
      const decoded = decodeFromBase64(encoded);

      expect(decoded).toBe(original);
      expect(encoded).not.toBe(original);
    });

    it('should handle empty string', () => {
      const original = '';
      const encoded = encodeToBase64(original);
      const decoded = decodeFromBase64(encoded);

      expect(decoded).toBe(original);
    });

    it('should handle unicode characters', () => {
      const original = 'привет мир! 你好';
      const encoded = encodeToBase64(original);
      const decoded = decodeFromBase64(encoded);

      expect(decoded).toBe(original);
    });
  });

  describe('headersToQueryParams and queryParamsToHeaders', () => {
    const testHeaders: Header[] = [
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'Authorization', value: 'Bearer token123', enabled: true },
      { key: 'X-Disabled', value: 'disabled', enabled: false },
      { key: '', value: 'empty-key', enabled: true },
    ];

    it('should convert headers to query params', () => {
      const params = headersToQueryParams(testHeaders);

      expect(params).toEqual({
        'Content-Type': 'application%2Fjson',
        Authorization: 'Bearer%20token123',
      });
      expect(params['X-Disabled']).toBeUndefined();
      expect(params['']).toBeUndefined();
    });

    it('should convert query params to headers', () => {
      const searchParams = new URLSearchParams();
      searchParams.append('Content-Type', 'application/json');
      searchParams.append('Authorization', 'Bearer token123');

      const headers = queryParamsToHeaders(searchParams);

      expect(headers).toEqual([
        { key: 'Content-Type', value: 'application/json', enabled: true },
        { key: 'Authorization', value: 'Bearer token123', enabled: true },
      ]);
    });

    it('should handle empty headers array', () => {
      const params = headersToQueryParams([]);
      expect(params).toEqual({});
    });
  });

  describe('buildRestClientUrl and parseRestClientUrl', () => {
    const testHeaders: Header[] = [
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'Authorization', value: 'Bearer token', enabled: true },
    ];

    it('should not include body for GET requests', () => {
      const body = '{"test": "data"}';
      const url = buildRestClientUrl('GET', 'https://api.example.com', body, testHeaders);

      expect(url).not.toContain(encodeToBase64(body));
    });

    it('should handle empty body', () => {
      const url = buildRestClientUrl('POST', 'https://api.example.com', '', testHeaders);
      const parsed = parseRestClientUrl(url, '');

      expect(parsed.body).toBeUndefined();
    });
  });

  describe('error handling', () => {
    it('should return empty object for invalid URL parsing', () => {
      const result = parseRestClientUrl('/invalid/path', '');

      expect(result.method).toBeUndefined();
      expect(result.url).toBeUndefined();
      expect(result.body).toBeUndefined();
      expect(result.headers).toEqual([]);
    });
  });
});
