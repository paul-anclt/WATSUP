import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TradingService {

  constructor(private http: HttpClient) {
  }

  getAssetsInfo(asset: string) {
    return this.http.post('http://localhost:3001/getAssetsInfo', {
      asset: asset,
    });
  }
}
