import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import restClientFormReducer from '@/lib/store/slice/restClientFormSlice';

import RestClientPage from '../page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/components/Loader', () => ({
  default: () => <div>Loader</div>,
}));

vi.mock('@/components/restClient/RestClient', () => ({
  __esModule: true,
  default: () => <div>RestClient</div>,
}));

vi.mock('@/components/restClient/utils/urlUtils', () => ({
  decodeFromBase64: vi.fn((v: string) => atob(v)),
  queryParamsToHeaders: vi.fn(() => []),
}));

const store = configureStore({
  reducer: {
    restClientForm: restClientFormReducer,
  },
});

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/restclient/GET/aHR0cHM6Ly9hcGkuY29t',
      search: '',
    },
    writable: true,
  });
  vi.clearAllMocks();
});

describe('RestClientPage', () => {
  it('renders Loader while loading', () => {
    useAuthState.mockReturnValue([null, true]);
    const { container } = render(
      <Provider store={store}>
        <RestClientPage />
      </Provider>
    );
    expect(container).toHaveTextContent('Loader');
  });

  it('redirects if not user', () => {
    useAuthState.mockReturnValue([null, false]);
    render(
      <Provider store={store}>
        <RestClientPage />
      </Provider>
    );
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('renders RestClient if user present', async () => {
    useAuthState.mockReturnValue([{ uid: '123' }, false]);
    render(
      <Provider store={store}>
        <RestClientPage />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('RestClient')).toBeInTheDocument();
    });
  });
});
