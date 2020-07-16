import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './data.actions';
import Transaction from './transaction';

export const initialState: Transaction[] = [];

const _dataReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export function dataReducer(state, action) {
  return _dataReducer(state, action);
}
