'use client';

import { redirect } from 'next/navigation';
import { lazy, Suspense } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import { auth } from '@/lib/auth/firebase.config';

const RestClient = lazy(() => import('@/components/restClient/RestClient'));

export default function RestClientPage() {
  const [user] = useAuthState(auth);

  if (!user) {
    redirect('/');
  }

  return (
    <Suspense fallback={<Loader />}>
      <RestClient />
    </Suspense>
  );
}
