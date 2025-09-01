import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import RootLayout from '../layout';

function Children() {
  return <div>SHAW</div>;
}

test('Layout', () => {
  const { container } = render(
    <RootLayout>
      <Children />
    </RootLayout>
  );
  expect(container).toBeInTheDocument();
});
