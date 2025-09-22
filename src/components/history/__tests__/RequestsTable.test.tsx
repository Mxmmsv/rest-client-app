import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { RequestHistoryItem } from '@/lib/requests/types';

import RequestsTable from '../RequestsTable';

vi.mock('../LocalizedDate', () => ({
  __esModule: true,
  default: ({ date }: { date: Date }) => (
    <span data-testid="localized-date">{date.toISOString()}</span>
  ),
}));

describe('RequestsTable', () => {
  const history: RequestHistoryItem[] = [
    {
      id: '1',
      userId: 'user_1',
      url: 'https://example.com/api',
      method: 'GET',
      latency: 123.45,
      statusCode: 200,
      requestSize: 512,
      responseSize: 1024,
      error: null,
      headers: { 'Content-Type': 'application/json' },
      body: null,
      timestamp: new Date('2023-01-01T12:00:00Z'),
    },
    {
      id: '2',
      userId: 'user_2',
      url: 'https://example.com/error',
      method: 'POST',
      latency: null,
      statusCode: 500,
      requestSize: 1024,
      responseSize: 2048,
      error: 'Server Error',
      headers: {},
      body: '{}',
      timestamp: new Date('2023-01-02T12:00:00Z'),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<RequestsTable history={history} />);

    expect(screen.getByText('Method')).toBeInTheDocument();
    expect(screen.getByText('URL')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Latency (ms)')).toBeInTheDocument();
    expect(screen.getByText('Request Size (bytes)')).toBeInTheDocument();
    expect(screen.getByText('Response Size (bytes)')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Request Time')).toBeInTheDocument();
  });

  it('renders table rows with correct data', async () => {
    render(<RequestsTable history={history} />);

    const getCell = (text: string) => screen.findByText(text);

    expect(await getCell('GET')).toBeInTheDocument();
    expect(await getCell('POST')).toBeInTheDocument();

    const link = (await getCell('https://example.com/api')).closest('a');
    expect(link).toHaveAttribute('href', '/rest-client?id=1');

    expect(await getCell('200')).toBeInTheDocument();
    expect(await getCell('500')).toBeInTheDocument();

    expect(await getCell('123.45')).toBeInTheDocument();

    expect(await screen.findAllByText('-')).toHaveLength(2);

    expect(await getCell('Server Error')).toBeInTheDocument();

    const dates = await screen.findAllByTestId('localized-date');
    expect(dates[0]).toHaveTextContent('2023-01-01T12:00:00.000Z');
    expect(dates[1]).toHaveTextContent('2023-01-02T12:00:00.000Z');
  });
});
