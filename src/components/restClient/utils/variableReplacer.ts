import type { Variable } from '../hooks/useVariables';

export const replaceVariables = (text: string, variables: Variable[]): string => {
  console.log('replaceVariables called with:', text, variables);
  if (!text || !variables.length) return text;

  let result = text;
  variables.forEach((variable) => {
    result = result.replace(new RegExp(`\\{\\{${variable.name}\\}\\}`, 'g'), variable.value);
  });
  console.log('Result:', result);
  return result;
};
