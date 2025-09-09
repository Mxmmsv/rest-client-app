'use client';

import { Flex, Spin } from 'antd';
import Image from 'next/image';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" className="h-[80vh]">
      <Image
        src="/loader.webp"
        alt="Loading..."
        width={600}
        height={400}
        className="drop-shadow-xl/50"
      />
      <Spin />
    </Flex>
  );
}
