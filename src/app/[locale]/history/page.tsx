'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import { auth } from '@/lib/auth/firebase.config';

const HistoryStub = dynamic(() => import('@/components/historyPage/HistoryPageContent'), {
  loading: () => <Loader />,
});

export default function HistoryPage() {
  const [user] = useAuthState(auth);

  if (!user) {
    redirect('/');
  }

  return <HistoryPageContent />;
}
