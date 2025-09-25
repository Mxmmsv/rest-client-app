import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { describe, it, expect, vi } from 'vitest';

import EmptyHistoryPage from '../EmptyHistoryPage';

import type { PropsWithChildren } from 'react';

vi.mock('next/link', () => {
  return {
    default: ({ href, children, ...rest }: PropsWithChildren<{ href: string }>) => (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  };
});

const messages = {
  EmptyHistoryPage: {
    noRequests: 'No request history. Send your first request in',
    restClient: 'RESTful Client',
  },
};

describe('EmptyHistoryPage', () => {
  it('render component without errors', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmptyHistoryPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/No request history/i)).toBeInTheDocument();
  });

  it('display Empty component from antd library', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmptyHistoryPage />
      </NextIntlClientProvider>
    );
    const matches = screen.getAllByText(/No Data/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('has a clickable link', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <EmptyHistoryPage />
      </NextIntlClientProvider>
    );
    const link = screen.getByRole('link', { name: /RESTful Client/i });
    await userEvent.click(link);
    expect(link).toHaveAttribute('href', '/rest-client');
  });
});
