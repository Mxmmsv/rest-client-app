import { renderHook, act } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useVariables } from '../useVariables';

import type { User } from 'firebase/auth';

vi.mock('@/lib/auth/firebase.config');
vi.mock('react-firebase-hooks/auth');

const mockUser = { uid: 'test-user-id' } as User;

describe('useVariables hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    (useAuthState as unknown as { mockReturnValue: (value: unknown[]) => void }).mockReturnValue([
      mockUser,
      false,
      null,
    ]);
  });

  it('should initialize with empty array when no stored data', () => {
    const { result } = renderHook(() => useVariables());
    expect(result.current.variables).toEqual([]);
  });

  it('should add a variable', () => {
    const { result } = renderHook(() => useVariables());

    act(() => {
      result.current.addVariable({ name: 'api_url', value: 'https://api.example.com' });
    });

    expect(result.current.variables).toEqual([
      { name: 'api_url', value: 'https://api.example.com' },
    ]);
  });

  it('should handle corrupted JSON in localStorage and set empty array', () => {
    localStorage.setItem('rest-client-variables-test-user-id', 'invalid-json{');

    const { result } = renderHook(() => useVariables());

    expect(result.current.variables).toEqual([]);
  });

  it('should handle corrupted JSON in localStorage and set empty array', () => {
    localStorage.setItem('rest-client-variables-test-user-id', 'invalid-json{');

    const { result } = renderHook(() => useVariables());
    expect(result.current.variables).toEqual([]);
  });

  it('should handle undefined value from localStorage and set empty array', () => {
    localStorage.setItem('rest-client-variables-test-user-id', 'undefined');

    const { result } = renderHook(() => useVariables());

    expect(result.current.variables).toEqual([]);
  });

  it('should handle empty string in localStorage and set empty array', () => {
    localStorage.setItem('rest-client-variables-test-user-id', '');

    const { result } = renderHook(() => useVariables());

    expect(result.current.variables).toEqual([]);
  });
});
