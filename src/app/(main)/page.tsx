'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Space, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { getCounterValue } from '@/lib/store/selectors/counter';
import { increment, decrement } from '@/lib/store/slice/counterSlice';

export default function Main() {
  const value = useAppSelector(getCounterValue);
  const dispatch = useAppDispatch();

  return (
    <Flex justify="center" vertical align="center" gap="middle" className="h-[100vh]">
      <Typography.Title level={2}>Aboba</Typography.Title>
      <Space>
        <Button
          type="primary"
          disabled={value <= 0}
          onClick={() => dispatch(decrement())}
          aria-label="decrement"
        >
          <MinusOutlined />
        </Button>
        <Typography.Title level={3}>{value}</Typography.Title>
        <Button
          type="primary"
          disabled={value >= 10}
          onClick={() => dispatch(increment())}
          aria-label="increment"
        >
          <PlusOutlined />
        </Button>
      </Space>
    </Flex>
  );
}
