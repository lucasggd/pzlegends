import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Enviroment } from 'src/enviroment';
import { Login } from '../model/login';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  get user(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  login(username: string, password: string): void {
    let login = new Login();
    login.password = password;
    login.username = username;
    this._http.post(`http://localhost:8080/authenticate`, login).pipe(take(1)).subscribe({
      next: (d: any) => {

        const token = this.decodeJwt(d.t);

        let user = new User();

        user.id = token.id;
        user.username = token.username;
        user.t = d.t;

        this.user = user;
      }
    })
  }

  private decodeJwt(token: string) {
    var base64Payload = token.split(".")[1];
    var payload = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(payload);
  }
}
