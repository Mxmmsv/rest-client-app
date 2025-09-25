import { notFound } from 'next/navigation';
import { vi } from 'vitest';

import CatchAllPage from '../page';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('not found');
  }),
}));

it('calls notFound', () => {
  expect(() => CatchAllPage()).toThrow('not found');
  expect(notFound).toHaveBeenCalled();
});
