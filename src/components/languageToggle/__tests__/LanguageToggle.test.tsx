import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname, useParams } from 'next/navigation';
import { MockedFunction, vi } from 'vitest';

import LanguageToggle from '../LanguageToggle';

const useParamsMock = useParams as MockedFunction<typeof useParams>;
const usePathnameMock = usePathname as MockedFunction<typeof usePathname>;
const pushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({ push: pushMock })),
}));

describe('LanguageToggle', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('switches language on nested paths correctly', async () => {
    useParamsMock.mockReturnValue({ locale: 'en' });
    usePathnameMock.mockReturnValue('/en/blog/post');

    render(<LanguageToggle />);

    await userEvent.click(screen.getByText('RU'));
    expect(pushMock).toHaveBeenCalledWith('/ru/blog/post');
  });

  it('switches language correctly from root path without locale name', async () => {
    useParamsMock.mockReturnValue({ locale: 'ru' });
    usePathnameMock.mockReturnValue('');

    render(<LanguageToggle />);

    await userEvent.click(screen.getByText('EN'));
    expect(pushMock).toHaveBeenCalledWith('/en');
  });
});
