import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TradingService {

  constructor(private http: HttpClient) {
  }

  getAssetsInfo(asset: string) {
    return this.http.get('http://localhost:3001/getAssetsInfo/'+ asset);
    }
  getOrderBook(asset: string) {
    return this.http.get('http://localhost:3001/getOrderBook/'+ asset);
    }
  sell(orderType: string, type: string, volume: string, pair: string) {
    alert("Ordre de vente passé")
    return this.http.post('http://localhost:3001/order', {
      orderType: orderType,
      type: type,
      volume: volume,
      pair: pair
    });
  }
  buy(orderType: string, type: string, volume: string, pair: string) {
    alert("Ordre d'achat passé")
    return this.http.post('http://localhost:3001/order', {
      orderType: orderType,
      type: type,
      volume: volume,
      pair: pair
    });
  }
}
