import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingPacesDisplayPage } from './training-paces-display.page';
import { TrainingPacesComponentModule } from '../training-paces/training-paces.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TrainingPacesComponentModule,
  ],
  declarations: [TrainingPacesDisplayPage],
})
export class TrainingPacesDisplayPageModule {}
