'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { increment, decrement } from '@/lib/store/slice/counterSlice';

import { getCounterValue } from '../lib/store/selectors/counter';

export default function Home() {
  const value = useAppSelector(getCounterValue);
  const dispatch = useAppDispatch();

  return (
    <Flex justify="center" align="center" gap="middle">
      <Button
        type="primary"
        disabled={value <= 0}
        onClick={() => dispatch(decrement())}
        aria-label="decrement"
      >
        <MinusOutlined />
      </Button>
      <Typography.Title>{value}</Typography.Title>
      <Button
        type="primary"
        disabled={value >= 10}
        onClick={() => dispatch(increment())}
        aria-label="increment"
      >
        <PlusOutlined />
      </Button>
    </Flex>
  );
}
