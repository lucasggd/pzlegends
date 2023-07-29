import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.t) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.t}`
        }
      });
    }

    return next.handle(request).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['login']);
        }
      }));
  }
}