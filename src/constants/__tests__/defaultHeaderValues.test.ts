import { describe, it, expect } from 'vitest';

import { defaultHeaderValues } from '../defaultHeaderValues';

describe('defaultHeaderValues', () => {
  it('should have all expected headers with correct values', () => {
    expect(defaultHeaderValues).toEqual({
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      Authorization: 'Bearer ',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'User-Agent': 'MyApp/1.0',
      Host: '',
      Referer: '',
      Cookie: 'sessionId=',
      Origin: '',
      'If-None-Match': '',
      'If-Modified-Since': '',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    });
  });

  it('should contain specific keys', () => {
    const keys = Object.keys(defaultHeaderValues);
    expect(keys).toContain('Authorization');
    expect(keys).toContain('Content-Type');
    expect(keys).toContain('User-Agent');
  });

  it('all values should be strings', () => {
    Object.values(defaultHeaderValues).forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });
});
