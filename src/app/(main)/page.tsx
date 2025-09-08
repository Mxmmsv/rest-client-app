'use client';

import { Flex } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

import Loader from '@/components/Loader';
import AuthMain from '@/components/main/AuthMain';
import UnauthMain from '@/components/main/UnauthMain';
import { auth } from '@/lib/auth/firebase.config';

export default function Main() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Flex justify="center" vertical align="center" gap="middle" style={{ height: '100vh' }}>
        Authentication error: {error.message}
      </Flex>
    );
  }

  return user ? <AuthMain /> : <UnauthMain />;
}
