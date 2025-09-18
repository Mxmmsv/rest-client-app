import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/lib/auth/firebase.config';

export interface Variable {
  name: string;
  value: string;
}

const getStorageKey = (userId: string) => `rest-client-variables-${userId}`;

export const useVariables = () => {
  const [user] = useAuthState(auth);
  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    if (!user) return;

    const key = getStorageKey(user.uid);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setVariables(JSON.parse(stored));
      } catch {
        setVariables([]);
      }
    }
  }, [user]);

  const saveVariables = (newVariables: Variable[]) => {
    if (!user) return;

    setVariables(newVariables);
    const key = getStorageKey(user.uid);
    localStorage.setItem(key, JSON.stringify(newVariables));
  };

  const addVariable = (variable: Variable) => {
    console.log('Saving variable:', variable);
    saveVariables([...variables, variable]);
  };

  const deleteVariable = (index: number) => {
    saveVariables(variables.filter((_, i) => i !== index));
  };

  return {
    variables,
    addVariable,
    saveVariables,
    deleteVariable,
  };
};
