'use client';

import { Flex } from 'antd';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import animationData from '@/animations/loader.json';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" className="h-[80vh]">
      <Lottie animationData={animationData} style={{ height: '300px', width: '300px' }} />
    </Flex>
  );
}
