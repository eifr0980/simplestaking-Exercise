import { createReducer, on } from '@ngrx/store';
import { ApiSuccess } from './data.actions';
import Transaction from './transaction';
export interface RootState {
  error: any;
  transactions: Transaction[];
}
export const initialState = {
  error: null,
  transactions: [],
};
const _dataReducer = createReducer(
  initialState,
  on(ApiSuccess, (state, action) => ({
    transactions: state.transactions.concat(action.data),
    error: null,
  }))
);

export function transactionsReducer(state, action) {
  return _dataReducer(state, action);
}
