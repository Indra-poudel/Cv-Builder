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
      <button onClick={() => changeCount(true)}>Increase</button>
      <button onClick={() => changeCount(false)}>Decrease</button>
    </div>
  );
};

export default Counter;
