import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import type { RequestHistoryItem } from '@/lib/requests/types';

import HistoryRequestsPage from '../HistoryRequestsPage';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      backToClient: 'Back to RESTful Client',
    };
    return translations[key] || key;
  },
}));

vi.mock('../RequestsTable', () => ({
  default: ({ history }: { history: RequestHistoryItem[] }) => (
    <div data-testid="requests-table">{history.length} rows</div>
  ),
}));

vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('HistoryRequestsPage', () => {
  const mockHistory: RequestHistoryItem[] = [
    {
      id: '1',
      userId: 'user1',
      url: 'https://example.com',
      method: 'GET',
      latency: 123,
      statusCode: 200,
      requestSize: 100,
      responseSize: 200,
      error: null,
      headers: {},
      body: null,
      timestamp: new Date(),
    },
    {
      id: '2',
      userId: 'user1',
      url: 'https://example.org',
      method: 'POST',
      latency: 456,
      statusCode: 201,
      requestSize: 150,
      responseSize: 300,
      error: null,
      headers: {},
      body: '{"test":1}',
      timestamp: new Date(),
    },
  ];

  it('renders back link', () => {
    render(<HistoryRequestsPage history={[]} />);
    const backLink = screen.getByRole('link', { name: /Back to RESTful Client/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/rest-client');
  });

  it('renders RequestsTable with history', () => {
    render(<HistoryRequestsPage history={mockHistory} />);
    const table = screen.getByTestId('requests-table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent('2 rows');
  });
});
