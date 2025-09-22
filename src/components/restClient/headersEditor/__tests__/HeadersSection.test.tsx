import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import HeadersSection from '../HeadersSection';

vi.mock('../HeadersEditor', () => ({
  default: () => <div data-testid="headers-editor">HeadersEditor Component</div>,
}));

vi.mock('../UrlPreview', () => ({
  default: () => <div data-testid="url-preview">UrlPreview Component</div>,
}));

describe('HeadersSection', () => {
  it('renders HeadersEditor component', () => {
    render(<HeadersSection />);
    const editor = screen.getByTestId('headers-editor');
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveTextContent('HeadersEditor Component');
  });

  it('renders UrlPreview component', () => {
    render(<HeadersSection />);
    const preview = screen.getByTestId('url-preview');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveTextContent('UrlPreview Component');
  });
});
