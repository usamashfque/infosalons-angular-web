import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  constructor(public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // set bearer JWT token
    return next.handle(this.addAuthToken(request))
      .pipe(
        catchError((requestError: any) => {
          console.log(requestError)
          if (requestError && requestError.status === 401) {
            this.signOut();
            return throwError(() => new Error(requestError?.error));
          } else {
            return throwError(() => new Error(requestError?.error));
          }
        })
      );
  }

  addAuthToken(request: HttpRequest<any>) {
    var _signInUserToken = localStorage.getItem('_access_token') || '';

    const token = (!!_signInUserToken) ? _signInUserToken : '';

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  signOut() {
    localStorage.removeItem("signinuserinfo");
    localStorage.removeItem("_access_token");
    this.router.navigateByUrl("signin");
  }
}
