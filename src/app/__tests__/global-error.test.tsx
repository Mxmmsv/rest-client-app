import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect } from 'vitest';

import GlobalError from '../global-error';

describe('GlobalError', () => {
  const mockError = new Error('Test error');
  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error messages', () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText('Something went wrong during rendering.')).toBeInTheDocument();
    expect(
      screen.getByText(/Don’t worry, it’s not your fault. Try refreshing the page/i)
    ).toBeInTheDocument();
  });

  it('calls reset when clicking Try again button', async () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    await userEvent.click(screen.getByRole('button', { name: /try again/i }));

    expect(mockReset).toHaveBeenCalled();
  });
});
