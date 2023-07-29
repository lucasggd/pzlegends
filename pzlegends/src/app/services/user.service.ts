import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from 'src/enviroment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let login = new Login();
    login.password = password;
    login.username = username;
    return this._http.post(`http://localhost:8080/authenticate`, login)
  }
}
