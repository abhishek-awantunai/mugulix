import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonService } from '../../../../../shared/services/commonService';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private _authService: AuthService,
    private _commonService: CommonService,
    private _dataService: DataService,
    private _toastrService: ToastrService
  ) {}

  makeUserSignUp(form) {
    this._commonService.showloader();
    this._authService.signUpService(form).subscribe(
      (res) => {
        if (res.status) {
          if (res.status) {
            this._commonService.setLocalStorage(res.data);
            this._dataService.setHttpHeaders();
          }
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
