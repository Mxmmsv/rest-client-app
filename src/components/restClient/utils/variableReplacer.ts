import type { Variable } from '../hooks/useVariables';

export const replaceVariables = (text: string, variables: Variable[]): string => {
  console.log('replaceVariables called with:', text, variables);
  if (!text || !variables.length) return text;

  const result = text.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
    console.log('Found variable:', match, variableName);
    const variable = variables.find((v) => v.name === variableName);
    console.log('Variable found:', variable);
    return variable ? variable.value : match;
  });
  console.log('Result:', result);
  return result;
};
