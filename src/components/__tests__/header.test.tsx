import { render } from '@testing-library/react';

import Header from '../header';

it('should return Header layout', () => {
  const { container } = render(<Header />);
  expect(container).toBeInTheDocument();
});
