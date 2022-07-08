import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {
  constructor(public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((requestError: any) => {
        console.log(requestError)
        if (requestError && requestError.status === 401) {
          this.signOut();
          //return next.handle(this.addAuthToken(request));
          return throwError(() => new Error(requestError));
        } else {
          return throwError(() => new Error(requestError));
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
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return next.handle(req).pipe(
  //     catchError(error => {
  //       if (error.status == 401) {
  //         // this.router.navigateByUrl("lawyer/signin");
  //       }
  //       console.error("error is intercept", error);
  //       return throwError(error.message);
  //     })
  //   );
  // }
}
