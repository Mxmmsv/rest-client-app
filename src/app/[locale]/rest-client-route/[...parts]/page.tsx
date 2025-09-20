'use client';

import dynamic from 'next/dynamic';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Loader from '@/components/Loader';
import { decodeFromBase64, queryParamsToHeaders } from '@/components/restClient/utils/urlUtils';
import { setHeader, updateRestClientFormField } from '@/lib/store/slice/restClientFormSlice';
const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  loading: () => <Loader />,
});

export default function DynamicRestClientPage({
  params,
}: Readonly<{
  params: Promise<{ parts: string[] }>;
}>) {
  const { parts } = use(params);
  const dispatch = useDispatch();

  useEffect(() => {
    if (parts.length >= 2) {
      try {
        const method = parts[0];
        const decodedUrl = decodeFromBase64(parts[1]);

        dispatch(updateRestClientFormField({ field: 'method', value: method }));
        dispatch(updateRestClientFormField({ field: 'url', value: decodedUrl }));

        if (parts[2]) {
          const decodedBody = decodeFromBase64(parts[2]);
          dispatch(updateRestClientFormField({ field: 'body', value: decodedBody }));
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
  }, [parts, dispatch]);

  return <RestClient />;
}
