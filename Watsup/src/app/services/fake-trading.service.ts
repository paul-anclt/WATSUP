import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FakeTradingService {

  sold: number = 0;

  wallets: any;
  allCurrencies: any;

  constructor(private http: HttpClient) { 
    this.getAllCurrencies();
  }

  addMoneyToSold(addMoney: number){
    this.sold += addMoney;
  }

  getWallets(idUser:number){
    return this.http.get('http://localhost:3001/getFakeWalletsOfUser/'+idUser)
  }

  addWallet(idUser:number , currency: any){
    return this.http.post('http://localhost:3001/createFakeWallet',{
      idUser: idUser,
      devise: currency.id
    })
  }

  buyCurrency(wallet: any, ammount:number){
    return this.http.post('http://localhost:3001/buy',{
      montant: ammount,
      idWallet: wallet.idwallet,
      devise: wallet.devise,
      sold: this.sold
    })
  }

  sellCurrency(wallet: any, ammount:number){
    return this.http.post('http://localhost:3001/sell',{
      montant: ammount,
      idWallet: wallet.idwallet,
      devise: wallet.devise,
      sold: this.sold,
      walletSold: wallet.montant
    })
  }

  getAllCurrencies() {
    this.http.get('https://api.coingecko.com/api/v3/coins/list').subscribe(res => this.allCurrencies = res);
  }

  getWalletsInformations() {
    var walletCurrencies = this.wallets.map((w) => {return w.devise});
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+walletCurrencies.toString()+'&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  }
}
