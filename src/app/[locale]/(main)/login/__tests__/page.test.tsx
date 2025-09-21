import { render, screen } from '@testing-library/react';

import SignInPage from '../page';

vi.mock('@/components/main/SignIn', () => ({ default: () => <div>SignIn</div> }));

it('renders SignIn component', () => {
  render(<SignInPage />);
  expect(screen.getByText('SignIn')).toBeInTheDocument();
});
