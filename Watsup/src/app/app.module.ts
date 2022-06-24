import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { TradingComponent } from './trading/trading.component';
import { FakeTradingComponent } from './fake-trading/fake-trading.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VarDirective } from './directives/ng-var.directive';
import { FakeTradingDialogComponent } from './diagol/fake-trading-dialog/fake-trading-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    TradingComponent,
    FakeTradingComponent,
    VarDirective,
    FakeTradingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
