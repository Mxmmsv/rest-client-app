'use client';

import { Segmented } from 'antd';
import { useRouter, usePathname, useParams } from 'next/navigation';

const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as 'en' | 'ru';

  const handleChange = (newLocale: 'en' | 'ru') => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div style={{ margin: '30px 0' }}>
      <Segmented
        value={locale}
        onChange={(val) => handleChange(val as 'en' | 'ru')}
        options={[
          { label: 'EN', value: 'en' },
          { label: 'RU', value: 'ru' },
        ]}
      />
    </div>
  );
};

export default LanguageToggle;
