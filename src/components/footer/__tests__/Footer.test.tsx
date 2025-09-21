import { render, screen } from '@testing-library/react';
import * as nextIntl from 'next-intl';
import React from 'react';
import { vi } from 'vitest';

import { TEAM_MEMBERS } from '@/constants/team';

import Footer from '../Footer';

import type { Mock } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('Footer component', () => {
  const fakeTranslations: Record<string, string> = {
    'created-by': 'Created by',
  };

  TEAM_MEMBERS.forEach(({ id, initials }) => {
    fakeTranslations[id] = id;
    fakeTranslations[id + 'Initials'] = initials;
  });

  beforeEach(() => {
    (nextIntl.useTranslations as Mock).mockReturnValue(
      (key: string) => fakeTranslations[key] ?? key
    );
  });

  it('renders Footer', () => {
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
    expect(screen.getByText(/RS School \/ React/)).toBeInTheDocument();
  });

  it('displays current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });

  it('renders RS School link with correct attributes', () => {
    render(<Footer />);
    const link = screen.getByText('RS School / React').closest('a');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders all team avatars with correct initials', () => {
    render(<Footer />);
    TEAM_MEMBERS.forEach((member: { id: string; initials: string }) => {
      expect(screen.getByText(member.initials)).toBeInTheDocument();
    });
  });
});
