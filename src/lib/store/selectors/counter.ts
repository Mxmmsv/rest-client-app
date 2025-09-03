import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const getCounterState = (state: RootState) => state.counter;

export const getCounterValue = createSelector(
  [getCounterState],
  (counterState) => counterState.value
);
