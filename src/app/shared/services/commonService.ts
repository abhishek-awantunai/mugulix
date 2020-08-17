import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  authToken;
  user;
  loader: boolean;

  constructor(private _router: Router) {
    this.authToken = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  showloader() {
    setTimeout(() => {
      this.loader = true;
    }, 0);
  }
  hideloader() {
    setTimeout(() => {
      this.loader = false;
    }, 300);
  }

  setLocalStorage(data) {
    this.user = data.user;
    this.authToken = data.token;

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    this._router.navigateByUrl('/dashboard/product-list');
  }

  resetLocalStorage() {
    localStorage.clear();
    this.authToken = undefined;
    this.user = undefined;
    this._router.navigateByUrl('/auth/login');
  }
}
