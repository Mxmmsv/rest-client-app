import { render, screen } from '@testing-library/react';

import MainPage from '../page';

vi.mock('@/components/main/Main', () => ({ default: () => <div>Main</div> }));

it('renders Main component', () => {
  render(<MainPage />);
  expect(screen.getByText('Main')).toBeInTheDocument();
});
