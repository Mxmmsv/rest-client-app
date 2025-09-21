import reducer, {
  updateRestClientFormField,
  addHeader,
  updateHeader,
  setHeader,
  removeHeader,
} from '../restClientFormSlice';

describe('restClientFormSlice', () => {
  const initialState = {
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    body: '{ "foo": "foo", "boo": "boo" }',
    headers: [
      { key: 'Content-Type', value: 'application/json;charset=utf-8', enabled: true },
      { key: 'Authorization', value: 'Bearer', enabled: false },
    ],
  };

  it('updates a form field', () => {
    const nextState = reducer(
      initialState,
      updateRestClientFormField({ field: 'method', value: 'POST' })
    );
    expect(nextState.method).toBe('POST');
  });

  it('adds a header', () => {
    const nextState = reducer(initialState, addHeader());
    expect(nextState.headers.at(-1)).toEqual({ key: '', value: '', enabled: true });
    expect(nextState.headers.length).toBe(initialState.headers.length + 1);
  });

  it('updates an existing header by index', () => {
    const nextState = reducer(
      initialState,
      updateHeader({ index: 0, header: { value: 'application/xml' } })
    );
    expect(nextState.headers[0].value).toBe('application/xml');
  });

  it('sets header (updates existing one)', () => {
    const nextState = reducer(
      initialState,
      setHeader({ key: 'Content-Type', value: 'text/plain' })
    );
    expect(nextState.headers[0].value).toBe('text/plain');
  });

  it('sets header (adds new one if not found)', () => {
    const nextState = reducer(initialState, setHeader({ key: 'X-Test', value: '123' }));
    const added = nextState.headers.find((h) => h.key === 'X-Test');
    expect(added).toEqual({ key: 'X-Test', value: '123', enabled: true });
  });

  it('removes header by index', () => {
    const nextState = reducer(initialState, removeHeader(0));
    expect(nextState.headers.length).toBe(initialState.headers.length - 1);
    expect(nextState.headers.find((h) => h.key === 'Content-Type')).toBeUndefined();
  });
});
