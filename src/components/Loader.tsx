'use client';

import { Flex } from 'antd';
import Lottie from 'lottie-react';

import animationData from '@/animations/loader.json';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" className="h-[80vh]">
      <Lottie animationData={animationData} style={{ height: '300px', width: '300px' }} />
    </Flex>
  );
}
