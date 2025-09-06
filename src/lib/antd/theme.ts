import { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  token: {
    colorPrimary: 'var(--color-accent)',
    colorText: 'var(--color-primary)',
    colorLink: 'var(--color-accent)',
    colorLinkHover: 'var(--color-accent-light)',
    colorLinkActive: 'var(--color-additional)',
    fontSizeHeading1: 25,
    borderRadius: 10,
  },
  components: {
    Layout: {
      headerBg: 'var(--color-base)',
      headerColor: 'var(--color-additional-light)',
      headerPadding: '0 24px',
    },
    Button: {
      colorPrimary: 'var(--color-additional)',
      colorPrimaryHover: 'var(--color-primary-light)',
      colorPrimaryActive: 'var(--color-accent-light)',
    },
    Typography: {
      colorTextHeading: 'var(--color-accent)',
      titleMarginBottom: '0px',
      fontFamily: '"Press Start 2P", system-ui',
    },
  },
};
