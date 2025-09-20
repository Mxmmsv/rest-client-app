import dynamic from 'next/dynamic';

import Loader from '@/components/Loader';

const Main = dynamic(() => import('@/components/main/Main'), {
  loading: () => <Loader />,
});

export default function MainPage() {
  return <Main />;
}
