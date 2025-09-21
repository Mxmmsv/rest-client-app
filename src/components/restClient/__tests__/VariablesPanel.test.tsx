import { render, screen, fireEvent } from '@testing-library/react';

import VariablesPanel from '../VariablesPanel';

import type { Variable } from '../hooks/useVariables';

describe('VariablesPanel', () => {
  const mockVariables: Variable[] = [
    { name: 'api_url', value: 'https://api.example.com' },
    { name: 'token', value: 'secret123' },
  ];

  const mockAddVariable = vi.fn();
  const mockDeleteVariable = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render variables table', () => {
    render(
      <VariablesPanel
        variables={mockVariables}
        addVariable={mockAddVariable}
        deleteVariable={mockDeleteVariable}
      />
    );

    expect(screen.getByText('api_url')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
    expect(screen.getByText('token')).toBeInTheDocument();
  });

  it('should call addVariable when form is submitted', () => {
    render(
      <VariablesPanel
        variables={mockVariables}
        addVariable={mockAddVariable}
        deleteVariable={mockDeleteVariable}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Variable name'), {
      target: { value: 'new_var' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: 'new_value' },
    });
    fireEvent.click(screen.getByText('Add'));

    expect(mockAddVariable).toHaveBeenCalledWith({
      name: 'new_var',
      value: 'new_value',
    });
  });
});
