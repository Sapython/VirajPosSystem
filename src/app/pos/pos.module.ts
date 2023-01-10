import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { EffectsModule } from '@ngrx/effects';
import { BillingEffects } from './core/billing.effects';


@NgModule({
  declarations: [
    PosComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    EffectsModule.forFeature([BillingEffects])
  ]
})
export class PosModule { }
