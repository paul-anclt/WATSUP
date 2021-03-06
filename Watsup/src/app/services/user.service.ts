import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;

  constructor(private http: HttpClient) {
  }

  createUser(nom: string, prenom: string, email: string, password: string) {
    return this.http.post('http://localhost:3001/register', {
      nom: nom,
      prenom: prenom,
      email: email,
      password: password
    });
  }

  connectUser(email: string, password: string) {
    return this.http.post('http://localhost:3001/login', {
      email: email,
      password: password
    });
  }
}
