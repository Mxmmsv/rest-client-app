import { createSlice } from '@reduxjs/toolkit';

import type { FormValues, Header } from '@/components/restClient/types';

import type { Draft, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormValues = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  body: '{ "foo": "foo", "boo": "boo" }',
  headers: [
    { key: 'Content-Type', value: 'application/json;charset=utf-8', enabled: true },
    { key: 'Authorization', value: 'Bearer', enabled: false },
  ],
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
      state: Draft<FormValues>,
      action: PayloadAction<UpdateFormFieldPayload<K>>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    addHeader(state) {
      state.headers.push({ key: '', value: '', enabled: true });
    },

    updateHeader(state, action: PayloadAction<{ index: number; header: Partial<Header> }>) {
      state.headers[action.payload.index] = {
        ...state.headers[action.payload.index],
        ...action.payload.header,
      };
    },

    setHeader(state, action: PayloadAction<{ key: string; value: string; enabled?: boolean }>) {
      const { key, value, enabled = true } = action.payload;
      const index = state.headers.findIndex((h) => h.key.toLowerCase() === key.toLowerCase());
      if (index >= 0) {
        state.headers[index] = { ...state.headers[index], value, enabled };
      } else {
        state.headers.push({ key, value, enabled });
      }
    },

    removeHeader(state, action: PayloadAction<number>) {
      state.headers.splice(action.payload, 1);
    },
  },
});

export const { updateRestClientFormField, addHeader, updateHeader, setHeader, removeHeader } =
  restClientFormSlice.actions;
export default restClientFormSlice.reducer;

// dispatch(updateField({ field: 'method', value: e.target.value }))
