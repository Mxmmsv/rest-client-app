'use client';

import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import RestClient from '@/components/restClient/RestClient';
import { auth } from '@/lib/auth/firebase.config';

export default function RestClientPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <RestClient />;
  }

  return redirect('/');
}
