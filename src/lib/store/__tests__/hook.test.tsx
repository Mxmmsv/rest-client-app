import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import { useAppDispatch, useAppSelector, useAppStore } from '../hooks';
import restClientFormReducer from '../slice/restClientFormSlice';

function TestComponent() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.restClientForm.method);
  const store = useAppStore();

  React.useEffect(() => {
    dispatch({ type: 'TEST_ACTION' });
  }, [dispatch]);

  return (
    <div>
      <div data-testid="method">{state}</div>
      <div data-testid="hasStore">{store ? 'yes' : 'no'}</div>
    </div>
  );
}

describe('typed redux hooks', () => {
  it('useAppDispatch, useAppSelector and useAppStore work', () => {
    const store = configureStore({
      reducer: {
        restClientForm: restClientFormReducer,
      },
    });

    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    expect(screen.getByTestId('method').textContent).toBe(store.getState().restClientForm.method);
    expect(screen.getByTestId('hasStore').textContent).toBe('yes');
  });
});
