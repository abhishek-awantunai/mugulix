import { Injectable } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { CONFIG } from '../../../configs/js/base.url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _dataService: DataService) {}

  loginService(data) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.AUTH.LOGIN,
      data
    );
  }

  signUpService(data) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.AUTH.SIGNUP,
      data
    );
  }
}
