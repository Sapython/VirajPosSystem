import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BillingEffects } from './billing.effects';

describe('BillingEffects', () => {
  let actions$: Observable<any>;
  let effects: BillingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BillingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BillingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
