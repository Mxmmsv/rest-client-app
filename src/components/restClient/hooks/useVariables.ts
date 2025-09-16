import { useEffect, useState } from 'react';

export interface Variable {
  name: string;
  value: string;
}

export const useVariables = () => {
  const [variables, setVariables] = useState<Variable[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('rest-client-variables');
    if (stored) {
      try {
        setVariables(JSON.parse(stored));
      } catch {
        setVariables([]);
      }
    }
  }, []);

  const saveVariables = (newVariables: Variable[]) => {
    setVariables(newVariables);
    localStorage.setItem('rest-client-variables', JSON.stringify(newVariables));
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
