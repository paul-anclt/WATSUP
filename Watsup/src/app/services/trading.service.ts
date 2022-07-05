import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TradingService {

  constructor(private http: HttpClient) {
  }

  test() {
    return this.http.get('http://localhost:3001/test');
  }
}
