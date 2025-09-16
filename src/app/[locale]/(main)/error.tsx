'use client';

import ErrorPage from '@/components/ErrorPage';

export default function RouteSegmentError({
  error,
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return <ErrorPage error={error} reset={reset} />;
}
