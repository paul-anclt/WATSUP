import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FakeTradingComponent } from './fake-trading/fake-trading.component';
import { TradingComponent } from './trading/trading.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trading', component: TradingComponent},
  { path: 'fake-trading', component: FakeTradingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
