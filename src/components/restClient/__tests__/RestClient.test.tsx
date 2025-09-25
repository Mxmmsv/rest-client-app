import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import restClientFormReducer from '@/lib/store/slice/restClientFormSlice';

import RestClient from '../RestClient';

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

const store = configureStore({
  reducer: { restClientForm: restClientFormReducer },
});

beforeAll(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({}),
  } as unknown as Response);
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      response: 'Response',
      generatedCode: 'Generated Code',
      request: 'Request',
    };
    return translations[key] || key;
  },
}));

describe('RestClient', () => {
  it('renders layout with left panel, request form, and tabs', async () => {
    render(
      <Provider store={store}>
        <RestClient />
      </Provider>
    );

    expect(await screen.findByRole('heading', { name: 'Request' })).toBeInTheDocument();
    const tabs = await screen.findAllByRole('tab');
    expect(tabs.length).toBeGreaterThanOrEqual(2);
  }, 10000);
});
