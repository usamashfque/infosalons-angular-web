import { Injectable } from '@angular/core';
import { Signin } from '../models/signin.model';
import { Signup } from '../models/signup.model';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private apiRequestService: ApiRequestService
  ) { }

  signin(data: Signin) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.post(`User/signin`, { ...data }, {}, false).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  signup(data: Signup) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.post(`User/signup`, { ...data }, {}, false).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  post(data: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.post(`account`, { ...data }, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  put(data: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.put(`account/${data.id}`, { ...data }, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  delete(id: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.delete(`account/${id}`, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  get(id: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.get(`account/${id}`, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }

  gets() {
    return new Promise((resolve, reject) => {
      this.apiRequestService.get(`account`, {}, true).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (e) => {
          reject(e)
        },
        complete: () => { }
      });
    });
  }
}
