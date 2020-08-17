import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonService } from '../../../../../shared/services/commonService';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
    private _commonService: CommonService,
    private _toastrService: ToastrService
  ) {}

  makeUserLogin(form) {
    this._commonService.showloader();
    this._authService.loginService(form).subscribe(
      (res) => {
        if (res.status) {
          this._commonService.setLocalStorage(res.data);
          this._dataService.setHttpHeaders();
        } else {
          this._toastrService.error(res.message, 'Error');
        }
        this._commonService.hideloader();
      },
      (err) => {
        this._toastrService.error(err.error.error, 'Error');
        this._commonService.hideloader();
      }
    );
  }
}
