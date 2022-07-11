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
}
