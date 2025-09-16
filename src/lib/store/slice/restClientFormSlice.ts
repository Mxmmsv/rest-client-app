import { createSlice } from '@reduxjs/toolkit';

import type { FormValues } from '@/components/restClient/types';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: FormValues = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  body: '{ "foo": "foo", "boo": "boo" }',
  headers: [{ key: 'Content-Type', value: 'application/json;charset=utf-8' }],
};

type UpdateFormFieldPayload<K extends keyof FormValues> = {
  field: K;
  value: FormValues[K];
};

export const restClientFormSlice = createSlice({
  name: 'restClientForm',
  initialState,
  reducers: {
    updateRestClientFormField<K extends keyof FormValues>(
      state: FormValues,
      action: PayloadAction<UpdateFormFieldPayload<K>>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateRestClientFormField } = restClientFormSlice.actions;
export default restClientFormSlice.reducer;

// dispatch(updateField({ field: 'method', value: e.target.value }))
