'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { Flex } from 'antd';

export default function Loader() {
  return (
    <Flex vertical justify="center" align="center" className="h-[80vh]">
      <Player autoplay loop src="/loader.json" style={{ height: '300px', width: '300px' }} />
    </Flex>
  );
}
