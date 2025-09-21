import dynamic from 'next/dynamic';

import Loader from '@/components/Loader';

const HistoryPageContent = dynamic(() => import('@/components/history/HistoryPageContent'), {
  loading: () => <Loader />,
});

export default function HistoryPage() {
  return <HistoryPageContent />;
}
