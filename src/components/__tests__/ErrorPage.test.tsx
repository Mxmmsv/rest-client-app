import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorPage from '../ErrorPage';

import type * as Antd from 'antd';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      error: 'Something went wrong',
      retry: 'Please try again',
      'retry-button': 'Try again',
    };
    return dict[key] ?? key;
  },
}));

vi.mock('antd', async (importOriginal) => {
  const antd = (await importOriginal()) as typeof Antd;
  return {
    ...antd,
    theme: {
      useToken: () => ({
        token: {
          colorBgContainer: '#fff',
          borderRadiusLG: 8,
        },
      }),
    },
  };
});

describe('ErrorPage', () => {
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error messages and reset button', () => {
    render(<ErrorPage error={new Error('fail')} reset={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Please try again')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  it('calls reset when reset prop is provided', async () => {
    render(<ErrorPage error={new Error('fail')} reset={mockReset} />);

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('reloads window when reset prop is not provided', async () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: reloadMock,
      },
      writable: true,
    });

    render(<ErrorPage error={new Error('fail')} />);

    await userEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });
});
