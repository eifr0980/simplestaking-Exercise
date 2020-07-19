import { createAction, props } from '@ngrx/store';

export const GetAction = createAction('[Transactions Page] Load Transactions');
export const ApiSuccess = createAction(
  '[Transactions Page] Success',
  props<{ data: any }>()
);
