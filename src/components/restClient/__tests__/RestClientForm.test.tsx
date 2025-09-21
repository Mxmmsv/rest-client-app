import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { restClient } from '@/lib/restClient/restClient';
import restClientFormReducer from '@/lib/store/slice/restClientFormSlice';

import RestClientForm from '../RestClientForm';

import type { MockedFunction } from 'vitest';

vi.mock('@/lib/restClient/restClient', () => ({
  restClient: vi.fn(),
}));

vi.mock('../utils/variableReplacer', () => ({
  replaceVariables: vi.fn((v) => v),
}));

vi.mock('../responseBodyViewer/BodyEditor', () => ({
  default: (props: { onContentTypeChange: (type: string) => void }) => {
    props.onContentTypeChange('json');
    return <div>BodyEditor</div>;
  },
}));

describe('RestClientForm', () => {
  const store = configureStore({
    reducer: { restClientForm: restClientFormReducer },
  });

  const variables: Array<{ name: string; value: string }> = [];
  const onResponse = vi.fn();
  const onGeneratedCode = vi.fn();
  const onThemeChange = vi.fn();

  const mockedRestClient = restClient as MockedFunction<typeof restClient>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedRestClient.mockReset();
  });

  it('renders form and tabs', () => {
    render(
      <Provider store={store}>
        <RestClientForm
          onResponse={onResponse}
          onGeneratedCode={onGeneratedCode}
          variables={variables}
          currentTheme="light"
          onThemeChange={onThemeChange}
        />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter API URL')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('Body editor')).toBeInTheDocument();
    expect(screen.getByText('Headers editor')).toBeInTheDocument();
    expect(screen.getByText('Generate code')).toBeInTheDocument();
  });

  it('submits form and calls restClient', async () => {
    mockedRestClient.mockResolvedValue({
      data: { result: 'ok' },
      status: 200,
      statusText: 'OK',
      duration: 10,
    });

    render(
      <Provider store={store}>
        <RestClientForm
          onResponse={onResponse}
          onGeneratedCode={onGeneratedCode}
          variables={variables}
          currentTheme="light"
          onThemeChange={onThemeChange}
        />
      </Provider>
    );

    const urlInput = screen.getByPlaceholderText('Enter API URL');
    fireEvent.change(urlInput, { target: { value: 'https://api.example.com' } });

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockedRestClient).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: 'https://api.example.com',
        })
      );
      expect(onResponse).toHaveBeenCalledWith(
        { result: 'ok' },
        expect.objectContaining({ status: 200, statusText: 'OK', duration: 10 })
      );
    });
  });

  it('handles invalid JSON body', async () => {
    render(
      <Provider store={store}>
        <RestClientForm
          onResponse={onResponse}
          onGeneratedCode={onGeneratedCode}
          variables={variables}
          currentTheme="light"
          onThemeChange={onThemeChange}
        />
      </Provider>
    );

    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(onResponse).not.toHaveBeenCalled();
      expect(screen.getByText('BodyEditor')).toBeInTheDocument();
    });
  });
});
