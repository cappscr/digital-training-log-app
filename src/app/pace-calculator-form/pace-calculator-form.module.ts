import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaceCalculatorFormComponent } from './pace-calculator-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PaceCalculatorFormComponent],
  exports: [PaceCalculatorFormComponent],
})
export class PaceCalculatorFormComponentModule {}