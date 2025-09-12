'use client';

import ErrorPage from '@/components/ErrorPage';

export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error; reset: () => void }>) {
  return <ErrorPage error={error} reset={reset} />;
}
