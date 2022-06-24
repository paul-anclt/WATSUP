import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FakeTradingService {

  sold: number = 0;

  wallets: any[] = [];
  allCurrencies: any;

  constructor(private http: HttpClient) { 
    this.getAllCurrencies();
  }

  addMoneyToSold(addMoney: number){
    this.sold += addMoney;
  }

  addWallet(currency: any){
    var idMax = Math.max.apply(Math, this.wallets.map((e) => { return e.id; }))+1 | 0;
    var wallet = {id:idMax, currency: currency, value: 0};
    this.wallets.push(wallet);
  }

  buyCurrency(wallet: any, ammount:number){
    this.http.get<any>('https://api.coingecko.com/api/v3/coins/'+wallet.currency.id).subscribe(res => 
    {
      var value_usd = res.market_data.current_price.usd*ammount;
      if( this.sold - value_usd >= 0){
        this.sold -= value_usd;
        wallet.value += ammount;
      }
    });
  }

  sellCurrency(wallet: any, ammount:number){
    this.http.get<any>('https://api.coingecko.com/api/v3/coins/'+wallet.currency.id).subscribe(res => 
    {
      if( wallet.value - ammount>=0) {
        this.sold += res.market_data.current_price.usd*ammount;
        wallet.value -= ammount;
      }
    });
  }

  getAllCurrencies() {
    this.http.get('https://api.coingecko.com/api/v3/coins/list').subscribe(res => this.allCurrencies = res);
  }

  getWalletsInformations() {
    var walletCurrencies = this.wallets.map((w) => {return w.currency.id});
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+walletCurrencies.toString()+'&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  }

  test(){
    return null;
  }
}
