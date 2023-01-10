import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { EffectsModule } from '@ngrx/effects';
import { BillingEffects } from '../pos/core/billing.effects';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    EffectsModule.forFeature([BillingEffects])
  ]
})
export class CoreModule { }
