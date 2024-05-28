import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
        title: 'Digital Training Log App | Dashboard',
      },
      {
        path: 'daily-vitals',
        loadChildren: () =>
          import('../daily-vitals/daily-vitals.module').then(
            (m) => m.DailyVitalsPageModule
          ),
        title: 'Digital Training Log App | Daily Vitals',
      },
      {
        path: 'pace-calculator',
        loadChildren: () =>
          import('../pace-calculator/pace-calculator.module').then(
            (m) => m.PaceCalculatorPageModule
          ),
        title: 'Digital Training Log App | Pace Caculator',
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
