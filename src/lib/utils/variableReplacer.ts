import type { Variable } from '../hooks/useVariables';

export const replaceVariables = (text: string, variables: Variable[]): string => {
  if (!text || !variables.length) return text;

  let result = text;
  variables.forEach((variable) => {
    result = result.replace(new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g'), variable.value);
  });
  return result;
};
