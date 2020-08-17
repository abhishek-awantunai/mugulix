import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonService } from '../../../../../shared/services/commonService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _dashboardService: DashboardService,
    private _commonService: CommonService,
    private _toastrService: ToastrService
  ) {}

  logoutUser() {
    this._commonService.showloader();
    this._dashboardService.logoutUser().subscribe((res) => {
      if (res.status) {
        this._commonService.resetLocalStorage();
        this._toastrService.success('Successfully logged out', 'Success');
        this._commonService.hideloader();
      }
    });
  }
}
