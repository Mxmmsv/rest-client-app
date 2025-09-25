import type { Variable } from '@/components/restClient/hooks/useVariables';

import { replaceVariables } from '../variableReplacer';

describe('variableReplacer', () => {
  const variables: Variable[] = [
    { name: 'api_url', value: 'https://api.example.com' },
    { name: 'token', value: 'secret123' },
  ];

  it('should replace variables in text', () => {
    const text = 'Endpoint: {{api_url}}, Token: {{token}}';
    const result = replaceVariables(text, variables);

    expect(result).toBe('Endpoint: https://api.example.com, Token: secret123');
  });

  it('should return original text if no variables', () => {
    const text = 'Just some text';
    const result = replaceVariables(text, variables);

    expect(result).toBe('Just some text');
  });

  it('should handle empty variables array', () => {
    const text = '{{api_url}}';
    const result = replaceVariables(text, []);

    expect(result).toBe('{{api_url}}');
  });
});
