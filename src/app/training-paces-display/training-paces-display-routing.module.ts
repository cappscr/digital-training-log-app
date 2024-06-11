import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingPacesDisplayPage } from './training-paces-display.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPacesDisplayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPacesDisplayRoutingModule {}
