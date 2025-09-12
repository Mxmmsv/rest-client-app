import { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
  token: {
    fontFamily: '"Quantico", sans-serif',
    colorPrimary: 'var(--color-accent)',
    colorText: 'var(--color-primary)',
    colorLink: 'var(--color-accent)',
    colorLinkHover: 'var(--color-accent-light)',
    colorLinkActive: 'var(--color-additional)',
    borderRadius: 10,
  },
  components: {
    Layout: {
      headerBg: 'var(--color-base)',
      headerColor: 'var(--color-additional-light)',
      headerPadding: '0 24px',
      bodyBg: 'var(--color-base-light)',
      siderBg: 'var(--color-base-light)',
      footerBg: 'var(--color-additional-light)',
    },
    Button: {
      colorPrimary: 'var(--color-additional)',
      colorPrimaryHover: 'var(--color-primary-light)',
      colorPrimaryActive: 'var(--color-accent-light)',
      colorPrimaryText: 'var(--color-additional-light)',
      colorLink: 'var(--color-additional-light)',
    },
    Typography: {
      colorTextHeading: 'var(--color-accent)',
      fontSize: 16,
    },
    Card: {
      colorBgContainer: 'var(--color-additional-light)',
      bodyPadding: 10,
      bodyPaddingSM: 4,
    },
    Select: {
      activeBorderColor: 'var(--color-additional)',
      hoverBorderColor: 'var(--color-additional)',
      optionSelectedBg: 'var(--color-accent)',
      activeOutlineColor: 'var(--color-additional)',
      // selectorBg: 'var(--color-bg-object)',
    },
    Input: {
      activeBorderColor: 'var(--color-additional)',
      hoverBorderColor: 'var(--color-additional)',
    },
  },
};
