import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAssetsInfo(asset: string) {
    return this.http.get('http://localhost:3001/getAssetsInfo/'+ asset);
  }

  userPlateformes(idUser: number) {
    return this.http.get('http://localhost:3001/userPlateformes/'+idUser);
  }

  getBalanceInfo() {
    return this.http.get('http://localhost:3001/getBalanceInfo/');
  }
}
