import { render, screen } from '@testing-library/react';

import SignUpPage from '../page';

vi.mock('@/components/main/SignUp', () => ({ default: () => <div>SignUp</div> }));

it('renders SignUp component', () => {
  render(<SignUpPage />);
  expect(screen.getByText('SignUp')).toBeInTheDocument();
});
