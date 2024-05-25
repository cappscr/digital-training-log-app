import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyVitalsPage } from './daily-vitals.page';

const routes: Routes = [
  {
    path: '',
    component: DailyVitalsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyVitalsRoutingModule {}
