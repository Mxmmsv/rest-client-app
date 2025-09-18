import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import AboutSection from '../AboutSection';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    target,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
  }) => (
    <a href={href} target={target}>
      {children}
    </a>
  ),
}));

vi.mock('@ant-design/icons', () => ({
  GithubOutlined: () => <span data-testid="github-icon">GitHub</span>,
  LinkedinOutlined: () => <span data-testid="linkedin-icon">LinkedIn</span>,
}));

describe('AboutSection component', () => {
  it('should render about section title', () => {
    render(<AboutSection />);
    expect(screen.getByText('About us')).toBeInTheDocument();
  });

  it('should render course link', () => {
    render(<AboutSection />);
    const courseLink = screen.getByText('RS School React course');
    expect(courseLink).toBeInTheDocument();
    expect(courseLink.closest('a')).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(courseLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('should render team repository link', () => {
    render(<AboutSection />);
    const repoLink = screen.getByText(/"Yet Another Dream Team"/i);
    expect(repoLink).toBeInTheDocument();
    expect(repoLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/Mxmmsv/rest-client-app'
    );
    expect(repoLink.closest('a')).toHaveAttribute('target', '_blank');
  });

  it('should render all team members', () => {
    render(<AboutSection />);

    expect(screen.getByText('Maksim Moiseev')).toBeInTheDocument();
    expect(screen.getByText('Ekaterina Dmitrenko')).toBeInTheDocument();
    expect(screen.getByText('Alla Tsaiukova')).toBeInTheDocument();
  });

  it('should render member images with correct alt text', () => {
    render(<AboutSection />);

    const maxImage = screen.getByAltText('Maksim Moiseev');
    const ekaterinaImage = screen.getByAltText('Ekaterina Dmitrenko');
    const allaImage = screen.getByAltText('Alla Tsaiukova');

    expect(maxImage).toBeInTheDocument();
    expect(ekaterinaImage).toBeInTheDocument();
    expect(allaImage).toBeInTheDocument();
  });

  it('should render social links for each member', () => {
    render(<AboutSection />);
    const githubIcons = screen.getAllByTestId('github-icon');
    const linkedinIcons = screen.getAllByTestId('linkedin-icon');

    expect(githubIcons).toHaveLength(3);
    expect(linkedinIcons).toHaveLength(3);
  });

  it('should have correct GitHub links', () => {
    render(<AboutSection />);

    const githubLinks = screen.getAllByTestId('github-icon').map((icon) => icon.closest('a'));

    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/Mxmmsv');
    expect(githubLinks[1]).toHaveAttribute('href', 'https://github.com/ek-ole');
    expect(githubLinks[2]).toHaveAttribute('href', 'https://github.com/AlyaEngineer');
  });

  it('should have correct LinkedIn links', () => {
    render(<AboutSection />);

    const linkedinLinks = screen.getAllByTestId('linkedin-icon').map((icon) => icon.closest('a'));

    expect(linkedinLinks[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/moiseevmaxim/');
    expect(linkedinLinks[1]).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ekaterina-dmitrenko-74531835a'
    );
    expect(linkedinLinks[2]).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/'
    );
  });

  it('should open social links in new tab', () => {
    render(<AboutSection />);

    const allLinks = screen.getAllByRole('link');
    const socialLinks = allLinks.filter(
      (link) =>
        link.getAttribute('href')?.includes('github.com') ||
        link.getAttribute('href')?.includes('linkedin.com')
    );

    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
