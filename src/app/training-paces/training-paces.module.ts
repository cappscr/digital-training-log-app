import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingPacesComponent } from './training-paces.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [TrainingPacesComponent],
  exports: [TrainingPacesComponent],
})
export class TrainingPacesComponentModule {}
