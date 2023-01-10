import { createAction, props } from '@ngrx/store';

export const loadBillings = createAction(
  '[Billing] Load Billings'
);

export const loadBillingsSuccess = createAction(
  '[Billing] Load Billings Success',
  props<{ data: any }>()
);

export const loadBillingsFailure = createAction(
  '[Billing] Load Billings Failure',
  props<{ error: any }>()
);
