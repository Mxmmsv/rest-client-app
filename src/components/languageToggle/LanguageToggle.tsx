'use client';

import { Radio } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

import { useAntdLocale } from '@/app/providers/AntdLocaleProvider';

const LanguageToggle: React.FC = () => {
  const { locale, setLocale } = useAntdLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: 'en' | 'ru') => {
    setLocale(newLocale);

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <Radio.Group value={locale} onChange={(e) => handleChange(e.target.value)}>
        <Radio.Button value="en">English</Radio.Button>
        <Radio.Button value="ru">Русский</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default LanguageToggle;
