import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/commonService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  categoryList: Array<any>;
  homeApiData: any;

  constructor(
    private _dasboarService: DashboardService,
    private _toastrService: ToastrService,
    private _commonService: CommonService
  ) {
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Categories',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
    };
  }

  ngOnInit() {
    this.getCategoryList();
    this.getHomeCategoryData();
  }

  updateHomeAPI(val) {
    this._commonService.showloader();
    val.categoryList = this.selectedItems.map((item) => item.id);
    this._dasboarService.updateHomeApi(val).subscribe(
      (res) => {
        console.log(res);
        if (res.status) {
          this._toastrService.success('Successfully Updated', 'Success');
        }
        this._commonService.hideloader();
      },
      (err) => {
        this._commonService.hideloader();
        this._toastrService.error(err.error.message, 'Error');
      }
    );
  }

  getHomeCategoryData() {
    this._commonService.showloader();
    this._dasboarService.getHomeApidata().subscribe(
      (res) => {
        if (res.status) {
          this.selectedItems = res.data.category_data.map((cat) => {
            return { itemName: cat.name, id: cat.id };
          });

          this.homeApiData = {};
          res.data.banner_data.flyer.forEach((data, index) => {
            this.homeApiData['image' + (index + 1)] = data.img_url;
            this.homeApiData['caption' + (index + 1)] = data.caption;
          });
          res.data.banner_data.advertisement.forEach((data, index) => {
            this.homeApiData['advImg' + (index + 1)] = data.img_url;
          });
          this.homeApiData['coupon'] = res.data.banner_data.coupon;
          this._commonService.hideloader();
        }
      },
      (err) => {
        this._commonService.hideloader();
        this._toastrService.error(err.error.message, 'Error');
      }
    );
  }

  getCategoryList() {
    this._commonService.showloader();
    this._dasboarService.getCatagoryList().subscribe(
      (res) => {
        this.categoryList = [...res.data];
        this.categoryList.forEach((category, index) => {
          const obj = {
            id: category.id,
            itemName: category.category_name,
          };
          this.dropdownList.push(obj);
        });
        this._commonService.hideloader();
      },
      (err) => {
        this._commonService.hideloader();
        this._toastrService.error(err.error.message, 'Error');
      }
    );
  }

  onItemSelect(item: any) {}
  OnItemDeSelect(item: any) {}
  onSelectAll(items: any) {}
  onDeSelectAll(items: any) {}
}
