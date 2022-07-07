import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountComponent } from './account/account.component';
import { DialogTokenComponent } from './dialog/dialog-token/dialog-token.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { TradingComponent } from './trading/trading.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeInfoComponent } from './change-info/change-info.component';

import { FakeTradingComponent } from './fake-trading/fake-trading.component';
import { VarDirective } from './directives/ng-var.directive';
import { FakeTradingDialogComponent } from './dialog/fake-trading-dialog/fake-trading-dialog.component';

import { StatistiqueComponent } from './statistique/statistique.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountComponent,
    DialogTokenComponent,
    NavbarComponent,
    ProfileComponent,
    TradingComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ChangeInfoComponent,

    FakeTradingComponent,
    VarDirective,
    FakeTradingDialogComponent,

    StatistiqueComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
