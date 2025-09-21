import { render } from '@testing-library/react';

import MainPage from '../page';

vi.mock('@/components/main/Main', () => ({ default: () => <div>Main</div> }));

it('renders Main component', () => {
  const { container } = render(<MainPage />);
  expect(container).toBeInTheDocument();
});
