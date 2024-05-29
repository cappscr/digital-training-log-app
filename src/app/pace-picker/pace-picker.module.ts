import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacePickerComponent } from '../pace-picker/pace-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PacePickerComponent],
  exports: [PacePickerComponent],
})
export class PacePickerComponentModule {}
