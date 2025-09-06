import { configureStore } from '@reduxjs/toolkit';

const mockAuthReducer = (state = { isAuthenticated: false }) => {
  return state;
};

export const createTestStore = (preloadedState: { auth: { isAuthenticated: boolean } }) => {
  return configureStore({
    reducer: {
      auth: mockAuthReducer,
      counter: (state = { value: 0 }) => state,
    },
    preloadedState,
  });
};
