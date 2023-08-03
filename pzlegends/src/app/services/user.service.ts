import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Login } from '../model/login';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _router: Router, private _http: HttpClient, private jwtHelper: JwtHelperService) { }

  get user(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  get userType(): any {
    if (!this.user || !this.user.t) return;
    return this.decodeJwt(this.user.t).userType;
  }

  login(username: string, password: string): void {
    let login = new Login();
    login.password = password;
    login.username = username;
    this._http.post(`http://localhost:8080/authenticate`, login).pipe(take(1)).subscribe({
      next: (d: any) => {

        if (d?.id) {
          this._router.navigate(['email-confirmation/' + d.id])
          return
        }

        const token = this.decodeJwt(d.t);

        let user = new User();

        user.id = token.id;
        user.username = token.username;
        user.t = d.t;

        this.user = user;

        window.location.reload();
      }
    })
  }

  register(username: string, email: string, password: string): Observable<any> {
    let register: any = {};
    register.password = password;
    register.username = username;
    register.email = email;
    return this._http.post(`http://localhost:8080/user/create-account`, register)
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    if (!this.user || !this.user.t || this.jwtHelper.isTokenExpired(this.user.t)) {
      return false;
    }
    return true;
  }

  isTokenExpired(): boolean {
    if (!this.user || !this.user.t) {
      return false;
    }
    return this.jwtHelper.isTokenExpired(this.user.t)
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

  confirmEmail(id: number, code: number): Observable<any> {
    let obj: any = {};
    obj.userId = id;
    obj.code = code;

    return this._http.post(`http://localhost:8080/user/confirmation`, obj);
  }
}
