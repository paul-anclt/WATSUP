import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FakeTradingService } from '../services/fake-trading.service';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FakeTradingDialogComponent } from '../diagol/fake-trading-dialog/fake-trading-dialog.component';

@Component({
  selector: 'app-fake-trading',
  templateUrl: './fake-trading.component.html',
  styleUrls: ['./fake-trading.component.css']
})
export class FakeTradingComponent implements OnInit {

  myControl = new FormControl('');
  filteredOptions: Observable<any[]>

  currenciesInfo: any = [];
  valueAdd;

  constructor(public fakeTradingService: FakeTradingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(1000),
      startWith(''),
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.fakeTradingService.allCurrencies)),
    );
  }

  addWallet() {
    console.log(this.myControl.value.id)
    if(this.myControl.value.id != null){
      this.fakeTradingService.addWallet(this.myControl.value)
      this.getInformationCurrencies();
    }
  }

  addMoney() {
    if(this.valueAdd != null){
      this.fakeTradingService.addMoneyToSold(this.valueAdd);
      this.valueAdd=null;
    }
  }

  getInformationCurrencies(){
    this.fakeTradingService.getWalletsInformations().subscribe(res => this.currenciesInfo = res);
  }

  findCurrencyInfo(id: string){
    console.log(this.currenciesInfo.filter(x => x.id == id)[0])
    return this.currenciesInfo.filter(x => x.id == id)[0];
  }

  openTradingDialog(wallet: any){
    const dialogRef = this.dialog.open(FakeTradingDialogComponent, {
      width: '1000px',
      data: {wallet: wallet},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      wallet = result;
    });
  }

  displayFn(crypto: any): string {
    return crypto && crypto.name ? crypto.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.fakeTradingService.allCurrencies.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
