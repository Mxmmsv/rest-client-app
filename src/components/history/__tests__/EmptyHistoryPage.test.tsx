import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('EmptyHistoryPage', () => {
  it('render component without errors', () => {
    render(<EmptyHistoryPage />);
    expect(screen.getByText(/No request history/i)).toBeInTheDocument();
  });

  it('display Empty component from antd library', () => {
    render(<EmptyHistoryPage />);
    const matches = screen.getAllByText(/No Data/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('has a clickable link', async () => {
    render(<EmptyHistoryPage />);
    const link = screen.getByRole('link', { name: /RESTful Client/i });
    await userEvent.click(link);
    expect(link).toHaveAttribute('href', '/rest-client');
  });
});
