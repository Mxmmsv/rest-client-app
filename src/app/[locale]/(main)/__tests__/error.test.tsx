import { render } from '@testing-library/react';
import { vi } from 'vitest';

import ErrorPage from '@/components/ErrorPage';

import RouteSegmentError from '../error';

vi.mock('@/components/ErrorPage', () => ({
  default: vi.fn(() => null),
}));

describe('RouteSegmentError', () => {
  it('passes error and reset to ErrorPage', () => {
    const error = new Error('fail');
    const reset = vi.fn();

    render(<RouteSegmentError error={error} reset={reset} />);

    expect(ErrorPage).toHaveBeenCalledWith(expect.objectContaining({ error, reset }), undefined);
  });
});
