import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Loading from '../loading';

vi.mock('@/components/Loader', () => ({
  default: () => <div role="status">Loading...</div>,
}));

describe('Loading component', () => {
  it('should render Loader inside Antd Content', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
