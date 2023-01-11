import { Action, createReducer, on } from '@ngrx/store';


export const billingFeatureKey = 'billing';

export interface BillState {
  loaded: boolean;
  billNo: number;
  kots:any[];
  device: string;
}

export const initialState: BillState = {
  loaded: false,
  billNo: 0,
  kots: [],
  device:''
};

export const reducer = createReducer(
  initialState,

);
