import { render, screen } from '@testing-library/react';
import { use } from 'react';
import { useDispatch } from 'react-redux';
import { vi } from 'vitest';

import { updateRestClientFormField, setHeader } from '@/lib/store/slice/restClientFormSlice';
import { decodeFromBase64 } from '@/lib/utils/urlUtils';

import DynamicRestClientPage from '../page';

import type * as ReactType from 'react';

vi.mock('next/dynamic', () => ({
  default: () => () => <div data-testid="rest-client">MockRestClient</div>,
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('@/lib/utils/urlUtils', () => ({
  decodeFromBase64: vi.fn((str: string) => str),
  queryParamsToHeaders: vi.fn(() => [{ key: 'X-Test', value: '123' }]),
}));

vi.mock('@/lib/store/slice/restClientFormSlice', () => ({
  updateRestClientFormField: vi.fn((payload: unknown) => ({ type: 'update', payload })),
  setHeader: vi.fn((payload: unknown) => ({ type: 'setHeader', payload })),
}));

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof ReactType>('react');
  return {
    ...actual,
    use: vi.fn(),
  };
});

describe('DynamicRestClientPage', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
    vi.mocked(use).mockReturnValue({
      parts: ['GET', 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=', 'eyJrZXkiOiAidmFsdWUifQ=='],
    });
    mockDispatch.mockClear();
  });

  it('should dispatch method, url, body and headers from params', () => {
    render(<DynamicRestClientPage params={Promise.resolve({ parts: [] })} />);

    expect(screen.getByTestId('rest-client')).toBeInTheDocument();

    expect(decodeFromBase64).toHaveBeenCalledWith('aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=');
    expect(mockDispatch).toHaveBeenCalledWith(
      updateRestClientFormField({ field: 'method', value: 'GET' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      updateRestClientFormField({ field: 'url', value: 'aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20=' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      updateRestClientFormField({ field: 'body', value: 'eyJrZXkiOiAidmFsdWUifQ==' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(setHeader({ key: 'X-Test', value: '123' }));
  });

  it('should not crash if params.parts is shorter', () => {
    vi.mocked(use).mockReturnValue({ parts: ['GET'] });

    render(<DynamicRestClientPage params={Promise.resolve({ parts: [] })} />);

    expect(screen.getByTestId('rest-client')).toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
