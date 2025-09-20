'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import { auth } from '@/lib/auth/firebase.config';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  loading: () => <Loader />,
});

export default function RestClientPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />;

  if (!user) return redirect('/');

  return <RestClient />;
}
