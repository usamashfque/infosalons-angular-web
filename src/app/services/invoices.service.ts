import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(
    private apiRequestService: ApiRequestService
  ) { }

  post(data: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.post(`invoice`, { ...data }, {}, true).subscribe({
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

  put(id: number, data: any) {
    return new Promise((resolve, reject) => {
      this.apiRequestService.put(`invoice/${id}`, { ...data }, {}, true).subscribe({
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
      this.apiRequestService.delete(`invoice/${id}`, {}, true).subscribe({
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
      this.apiRequestService.get(`invoice/${id}`, {}, true).subscribe({
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
      this.apiRequestService.get(`invoice`, {}, true).subscribe({
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
