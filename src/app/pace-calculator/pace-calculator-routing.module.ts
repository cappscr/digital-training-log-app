import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaceCalculatorPage } from './pace-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: PaceCalculatorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaceCalculatorPageRoutingModule {}
