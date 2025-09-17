import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

vi.mock('next/font/google', () => ({
  Press_Start_2P: () => ({ variable: 'mock-logo-font' }),
  Quantico: () => ({ variable: 'mock-primary-font' }),
}));

import RootLayout from '../layout';

function Children() {
  return <div>SHAW</div>;
}

it('Layout', () => {
  render(
    <RootLayout>
      <Children />
    </RootLayout>
  );
  expect(screen.getByText('SHAW')).toBeInTheDocument();
});
