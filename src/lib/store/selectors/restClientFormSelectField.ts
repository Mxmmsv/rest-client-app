import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const getFormState = (state: RootState) => state.restClientForm;

export const getMethod = createSelector([getFormState], (formState) => formState.method);

export const getUrl = createSelector([getFormState], (formState) => formState.url);

export const getBody = createSelector([getFormState], (formState) => formState.body);

export const getHeaders = createSelector([getFormState], (formState) => formState.headers);

// const method = useSelector(getMethod);
// const url = useSelector(getURL);
// const body = useSelector(getBody);
