import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaceCalculatorPage } from './pace-calculator.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PaceCalculatorFormComponentModule } from '../pace-calculator-form/pace-calculator-form.module';
import { PacePickerComponentModule } from '../pace-picker/pace-picker.module';

import { PaceCalculatorPageRoutingModule } from './pace-calculator-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PaceCalculatorFormComponentModule,
    PaceCalculatorPageRoutingModule,
    PacePickerComponentModule,
  ],
  declarations: [PaceCalculatorPage],
})
export class PaceCalculatorPageModule {}
