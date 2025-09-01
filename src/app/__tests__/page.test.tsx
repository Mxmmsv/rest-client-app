import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import Home from '../page';

test('Page', () => {
  const { container } = render(<Home />);
  expect(container).toBeDefined();
});
