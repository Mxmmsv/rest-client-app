import { describe, it, expect, vi, beforeEach } from 'vitest';

import { restClient } from '../restClient';

describe('restClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('performs GET request with normalized headers and parses JSON', async () => {
    const mockJson = { hello: 'world' };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockResolvedValue(mockJson),
      text: vi.fn(),
    });

    const res = await restClient<{ hello: string }, unknown>({
      method: 'GET',
      url: 'https://api.example.com',
      headers: [
        { key: 'X-Test', value: '123', enabled: true },
        { key: '', value: 'bad', enabled: false },
      ],
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com',
      expect.objectContaining({
        method: 'GET',
        headers: { 'X-Test': '123' },
      })
    );
    expect(res.data).toEqual(mockJson);
    expect(res.status).toBe(200);
    expect(res.statusText).toBe('OK');
    expect(res.duration).toBeGreaterThanOrEqual(0);
  });

  it('sends body as JSON if content-type not text/plain', async () => {
    const body = { foo: 'bar' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      statusText: 'Created',
      json: vi.fn().mockResolvedValue(body),
      text: vi.fn(),
    });

    await restClient({
      method: 'POST',
      url: 'https://api.example.com',
      headers: [{ key: 'Content-Type', value: 'application/json', enabled: true }],
      body,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(body),
      })
    );
  });

  it('sends body as text if content-type is text/plain', async () => {
    const body = 'plain text body';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: vi.fn().mockRejectedValue(new Error('not json')),
      text: vi.fn().mockResolvedValue(body),
    });

    const res = await restClient<string, string>({
      method: 'POST',
      url: 'https://api.example.com',
      headers: [{ key: 'Content-Type', value: 'text/plain', enabled: true }],
      body,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com',
      expect.objectContaining({
        method: 'POST',
        body,
      })
    );
    expect(res.data).toBe(body);
  });

  it('handles non-ok response correctly', async () => {
    const errorBody = { message: 'Error occurred' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: vi.fn().mockResolvedValue(errorBody),
      text: vi.fn(),
    });

    const res = await restClient<{ message: string }, unknown>({
      method: 'GET',
      url: 'https://api.example.com',
    });

    expect(res.status).toBe(400);
    expect(res.statusText).toBe('Bad Request');
    expect(res.data).toEqual(errorBody);
  });
});
