'use client';

import { redirect } from 'next/navigation';
import { lazy, Suspense, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import Loader from '@/components/Loader';
import { decodeFromBase64, queryParamsToHeaders } from '@/components/restClient/utils/urlUtils';
import { auth } from '@/lib/auth/firebase.config';
import { setHeader, updateRestClientFormField } from '@/lib/store/slice/restClientFormSlice';

const RestClient = lazy(() => import('@/components/restClient/RestClient'));

export default function RestClientPage() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || loading) return;

    const pathParts = window.location.pathname.split('/');
    const method = pathParts[3];
    const encodedUrl = pathParts[4];
    const encodedBody = pathParts[5];

    if (method && encodedUrl) {
      try {
        const url = decodeFromBase64(encodedUrl);
        dispatch(updateRestClientFormField({ field: 'method', value: method }));
        dispatch(updateRestClientFormField({ field: 'url', value: url }));
        if (encodedBody) {
          const body = decodeFromBase64(encodedBody);
          dispatch(updateRestClientFormField({ field: 'body', value: body }));
        }

        const searchParams = new URLSearchParams(window.location.search);
        const headers = queryParamsToHeaders(searchParams);
        headers.forEach((header) => {
          dispatch(setHeader(header));
        });
      } catch (error) {
        console.error('Error parsing URL parameters:', error);
      }
    }
  }, [user, loading, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    redirect('/');
  }

  return (
    <Suspense fallback={<Loader />}>
      <RestClient />
    </Suspense>
  );
}
