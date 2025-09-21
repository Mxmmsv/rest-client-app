import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import CodeGeneratorSection from '../CodeGeneratorSection';
import * as useCodeGeneratorModule from '../useCodeGenerator';

const mockSetLanguage = vi.fn();
const mockSetVariant = vi.fn();
const mockHandleGenerateCode = vi.fn();

vi.spyOn(useCodeGeneratorModule, 'default').mockImplementation(() => ({
  language: null,
  variant: null,
  languageOptions: [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
  ],
  variantOptions: [
    { label: 'Fetch', value: 'fetch' },
    { label: 'Axios', value: 'axios' },
  ],
  setLanguage: mockSetLanguage,
  setVariant: mockSetVariant,
  handleGenerateCode: mockHandleGenerateCode,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      language: 'Language',
      variant: 'Variant',
      generateCode: 'Generate code',
    };
    return translations[key] || key;
  },
}));

describe('CodeGeneratorSection', () => {
  beforeEach(() => {
    mockSetLanguage.mockReset();
    mockSetVariant.mockReset();
    mockHandleGenerateCode.mockReset();
  });

  it('renders selects and generate button', () => {
    render(<CodeGeneratorSection onGeneratedCode={vi.fn()} />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Variant')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate code/i })).toBeInTheDocument();
  });

  it('calls handleGenerateCode and onGeneratedCode when clicking generate button', async () => {
    const onGeneratedCode = vi.fn();
    mockHandleGenerateCode.mockResolvedValue('aboba');

    vi.spyOn(useCodeGeneratorModule, 'default').mockReturnValue({
      language: 'javascript',
      variant: 'fetch',
      languageOptions: [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'TypeScript', value: 'typescript' },
      ],
      variantOptions: [{ label: 'Fetch', value: 'fetch' }],
      setLanguage: mockSetLanguage,
      setVariant: mockSetVariant,
      handleGenerateCode: mockHandleGenerateCode,
    });

    render(<CodeGeneratorSection onGeneratedCode={onGeneratedCode} />);
    const button = screen.getByRole('button', { name: /generate code/i });
    await userEvent.click(button);

    await waitFor(() => expect(mockHandleGenerateCode).toHaveBeenCalled());
    await waitFor(() => expect(onGeneratedCode).toHaveBeenCalledWith('aboba'));
  });
});
