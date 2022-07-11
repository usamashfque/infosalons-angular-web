import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {

  }

  post(endpoint: string, body: any, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders();

    return <Observable<any>>this.http.post(this.baseUrl + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders();

    return <Observable<any>>this.http.put(this.baseUrl + endpoint, body, options);
  }

  delete(endpoint: string, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders();

    return <Observable<any>>this.http.delete(this.baseUrl + endpoint, options);
  }

  get(endpoint: string, options?: any, isAuth: boolean = false) {
    if (!options) {
      options = {};
    }

    options.headers = new HttpHeaders();

    return <Observable<any>>this.http.get(this.baseUrl + endpoint, options);
  }
}
