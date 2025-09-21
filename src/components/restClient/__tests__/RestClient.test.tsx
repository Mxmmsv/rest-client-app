import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import restClientFormReducer from '@/lib/store/slice/restClientFormSlice';

import RestClient from '../RestClient';

const store = configureStore({
  reducer: { restClientForm: restClientFormReducer },
});

describe('RestClient', () => {
  it('renders layout with left panel, request form, and tabs', () => {
    render(
      <Provider store={store}>
        <RestClient />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Request' })).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBeGreaterThanOrEqual(2);
  });
});
