import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonService } from '../../../../../shared/services/commonService';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from 'src/app/configs/js/base.url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public CONFIG = CONFIG;
  constructor(
    private _dashboardService: DashboardService,
    public _commonService: CommonService,
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
