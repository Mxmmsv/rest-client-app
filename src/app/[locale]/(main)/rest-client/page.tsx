'use client';

import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';

import Loader from '@/components/Loader';
import { auth } from '@/lib/auth/firebase.config';
import { setHeader, updateRestClientFormField } from '@/lib/store/slice/restClientFormSlice';
import { decodeFromBase64, queryParamsToHeaders } from '@/lib/utils/urlUtils';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  loading: () => <Loader />,
});

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
    }
  }, [user, loading, dispatch]);

  if (loading) return <Loader />;

  if (!user) return redirect('/');

  return <RestClient />;
}
