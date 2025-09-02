'use client';

import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { increment, decrement } from '@/lib/store/slice/counterSlice';

export default function Home() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="align-center flex gap-1">
      <Button type="primary" disabled={value <= 0} onClick={() => dispatch(decrement())}>
        -
      </Button>
      <span>{value}</span>
      <Button type="primary" disabled={value >= 10} onClick={() => dispatch(increment())}>
        +
      </Button>
    </div>
  );
}
