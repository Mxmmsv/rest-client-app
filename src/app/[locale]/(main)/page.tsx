import { Suspense } from 'react';

import Loader from '@/components/Loader';
import Main from '@/components/main/Main';

export default function MainPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Main />
    </Suspense>
  );
}
