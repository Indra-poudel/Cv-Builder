import React from 'react';

const FRUITS = ['Apple', 'Banana', 'Mango', 'Orange'];

const Router = () => {
  FRUITS.map((fruit) => <div>{fruit}</div>);
};

export default Router;
