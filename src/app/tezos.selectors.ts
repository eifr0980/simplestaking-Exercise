import { createSelector } from '@ngrx/store';
import { RootState } from './data.reducer';

const getSelectedData = (state: RootState): any => state.transactions;

const getStateSelectedData = createSelector(
  (state: { transactions: RootState }) => state.transactions,
  getSelectedData
);

export { getStateSelectedData };
