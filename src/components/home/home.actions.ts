export const INCREMENT_COUNT = '@@action/INCREMENT_COUNT';
export const DECREMENT_COUNT = '@@action/DECREMENT_COUNT';

export interface IncrementCount {
  type: typeof INCREMENT_COUNT;
}

export interface DecrementCount {
  type: typeof DECREMENT_COUNT;
}

export type CountActionTypes = IncrementCount | DecrementCount;

export const incrementCount = (): IncrementCount => ({
  type: INCREMENT_COUNT,
});

export const decrementCount = (): DecrementCount => ({
  type: DECREMENT_COUNT,
});
