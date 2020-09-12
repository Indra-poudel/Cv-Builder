import React from 'react';

interface CounterProps {
  count: number;
  changeCount: (val: boolean) => void;
}

const Counter = (props: CounterProps) => {
  const { count, changeCount } = props;

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => changeCount(true)}>+</button>
      <button onClick={() => changeCount(false)}>-</button>
    </div>
  );
};

export default Counter;
