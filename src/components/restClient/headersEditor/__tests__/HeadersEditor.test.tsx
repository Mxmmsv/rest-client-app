import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import * as selectors from '@/lib/store/selectors/restClientFormSelectField';
import * as sliceActions from '@/lib/store/slice/restClientFormSlice';

import HeadersEditor from '../HeadersEditor';

type Header = {
  key: string;
  value: string;
  enabled: boolean;
};

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('HeadersEditor', () => {
  const mockDispatch = vi.fn();
  const mockUseSelector = vi.mocked(useSelector);

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
  });

  const renderComponent = (headers: Header[]) => {
    mockUseSelector.mockImplementation((selector) => {
      if (selector == selectors.getHeaders) return headers;
      return [];
    });

    render(<HeadersEditor />);
  };

  it('renders all headers and the add button', () => {
    const headers: Header[] = [
      { key: 'Authorization', value: 'Bearer 123', enabled: true },
      { key: 'Content-Type', value: 'application/json', enabled: false },
    ];
    renderComponent(headers);

    headers.forEach((header) => {
      expect(screen.getByDisplayValue(header.key)).toBeInTheDocument();
      expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
    });

    expect(screen.getByText('addHeader')).toBeInTheDocument();
  });

  it('dispatches updateHeader when checkbox changes', async () => {
    const headers: Header[] = [{ key: 'X-Test', value: '123', enabled: false }];
    renderComponent(headers);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      sliceActions.updateHeader({ index: 0, header: { enabled: true } })
    );
  });

  it('dispatches removeHeader when delete button is clicked', () => {
    const headers: Header[] = [{ key: 'X-Test', value: '123', enabled: true }];
    renderComponent(headers);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith(sliceActions.removeHeader(0));
  });

  it('dispatches addHeader when add button is clicked', () => {
    renderComponent([]);
    const addButton = screen.getByRole('button', { name: /addHeader/i });
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith(sliceActions.addHeader());
  });
});
