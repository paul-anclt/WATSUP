import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getPlateformes(){
    return this.http.get('http://localhost:3001/plateformes');
  }

  userConnections(idUser: number) {
    return this.http.get('http://localhost:3001/userConnections/'+idUser);
  }

  addConnection(idPlateforme: number, idUser: number, token: string){
    return this.http.post('http://localhost:3001/addConnection',{
      idPlateforme: idPlateforme,
      idUser: idUser,
      token: token
    })
  }
}
