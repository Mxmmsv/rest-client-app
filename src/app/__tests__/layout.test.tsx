import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

vi.mock('next/font/google', () => ({
  Press_Start_2P: () => ({ variable: 'mock-font-press-start-2p' }),
  Quantico: () => ({ variable: 'mock-font-quantico' }),
}));

import RootLayout from '../layout';

function Children() {
  return <div>SHAW</div>;
}

test('Layout', () => {
  render(
    <RootLayout>
      <Children />
    </RootLayout>
  );
  expect(screen.getByText('SHAW')).toBeInTheDocument();
});
