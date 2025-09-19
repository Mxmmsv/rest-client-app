'use client';

import { redirect } from 'next/navigation';
import { Suspense, lazy } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import { auth } from '@/lib/auth/firebase.config';

const HistoryStub = lazy(() => import('@/components/history/HistoryStub'));

export default function HistoryPage() {
  const [user] = useAuthState(auth);

  if (!user) {
    redirect('/');
  }

  return (
    <Suspense fallback={<Loader />}>
      <HistoryStub />
    </Suspense>
  );
}
