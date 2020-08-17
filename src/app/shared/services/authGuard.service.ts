import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { CommonService } from './commonService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _commonService: CommonService) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this._commonService.authToken && this._commonService.user) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
