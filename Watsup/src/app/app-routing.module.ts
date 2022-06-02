import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TradingComponent } from './trading/trading.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trading', component: TradingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
