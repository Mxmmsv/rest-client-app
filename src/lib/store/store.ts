import { configureStore } from '@reduxjs/toolkit';

import restClientFormReducer from './slice/restClientFormSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      restClientForm: restClientFormReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
