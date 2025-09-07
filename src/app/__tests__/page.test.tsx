import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import Home from '../(main)/page';
import StoreProvider from '../StoreProvider';

describe('Home component', () => {
  it('increments and decrements the counter on button click', async () => {
    render(
      <StoreProvider>
        <Home />
      </StoreProvider>
    );

    const decrementButton = screen.getByRole('button', { name: 'decrement' });
    const incrementButton = screen.getByRole('button', { name: 'increment' });

    const user = userEvent.setup();

    await user.click(incrementButton);
    expect(screen.getByText('6')).toBeInTheDocument();

    await user.click(decrementButton);
    expect(screen.getByText('5')).toBeInTheDocument();

    for (let i = 0; i < 5; i++) await user.click(decrementButton);
    expect(decrementButton).toBeDisabled();

    for (let i = 0; i < 10; i++) await user.click(incrementButton);
    expect(incrementButton).toBeDisabled();
  });
});
