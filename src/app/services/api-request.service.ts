import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  private readonly baseUrl = environment.apiUrl;
  public getToken: string = "";

  constructor(
    private http: HttpClient
  ) {

  }


  // getHeaders(isbearer: boolean = false) {

  //   if (isbearer) {
  //     var _signInUserToken = localStorage.getItem('_access_token') || '';

  //     this.getToken = (!!_signInUserToken) ? _signInUserToken : '';

  //     let headers = new HttpHeaders()
  //       .append('Authorization', `Bearer ${this.getToken}`)
  //       .append('Content-Type', 'application/json')
  //       // .append('Content-Type', 'application/x-www-form-urlencoded')
  //       //.append('Content-Type', 'multipart/form-data')
  //       //.append('charset', 'utf-8')
  //       .append('Accept', 'application/json')
  //       .append('Access-Control-Allow-Origin', '*')
  //       .append('Access-Control-Allow-Credentials', 'true');
  //     return headers;
  //   } else {
  //     let headers = new HttpHeaders()
  //       .append('Content-Type', 'application/json')
  //       // .append('Content-Type', 'application/x-www-form-urlencoded')
  //       // .append('Content-Type', 'multipart/form-data')
  //       //.append('charset', 'utf-8')
  //       .append('Accept', 'application/json')
  //       .append('Access-Control-Allow-Origin', '*')
  //       .append('Access-Control-Allow-Credentials', 'true');
  //     return headers;
  //   }
  // }

  post(endpoint: string, body: any, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders(); //this.getHeaders(isAuth);

    return <Observable<any>>this.http.post(this.baseUrl + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders(); // this.getHeaders(isAuth);

    return <Observable<any>>this.http.put(this.baseUrl + endpoint, body, options);
  }

  delete(endpoint: string, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders(); // this.getHeaders(isAuth);

    return <Observable<any>>this.http.delete(this.baseUrl + endpoint, options);
  }

  get(endpoint: string, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders(); //this.getHeaders(isAuth);

    return <Observable<any>>this.http.get(this.baseUrl + endpoint, options);
  }
}
