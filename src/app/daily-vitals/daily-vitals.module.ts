import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyVitalsPage } from './daily-vitals.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DailyVitalsRoutingModule } from './daily-vitals-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DailyVitalsRoutingModule,
  ],
  declarations: [DailyVitalsPage],
})
export class DailyVitalsPageModule {}
