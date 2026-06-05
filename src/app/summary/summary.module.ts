import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryPageRoutingModule } from './summary-routing.module';

import { SummaryPage } from './summary.page';
import { ArsCurrencyPipe } from '../pipes/ars-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryPageRoutingModule,
    ArsCurrencyPipe
  ],
  declarations: [SummaryPage]
})
export class SummaryPageModule {}
