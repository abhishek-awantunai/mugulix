import { Component, OnInit, TemplateRef } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../../shared/services/commonService';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  modalRef: BsModalRef;
  public categoryList: Array<any>;
  public selectedCategoryIndex: string;

  constructor(
    private _commonService: CommonService,
    private _dashboardService: DashboardService,
    private _bsModalService: BsModalService,
    private _toastrService: ToastrService
  ) {
    this.categoryList = [];
  }

  ngOnInit(): void {
    this.getCatagoryLists();
  }

  getCatagoryLists() {
    this._commonService.showloader();
    this._dashboardService.getCatagoryList().subscribe(
      (res) => {
        if (res.status) {
          this.categoryList = [...res.data];
        }
        this._commonService.hideloader();
      },
      (err) => {
        this._toastrService.error(err.error.message, 'Error');
        this._commonService.hideloader();
      }
    );
  }

  openModal(template: TemplateRef<any>, index?: string) {
    this.selectedCategoryIndex = index;
    this.modalRef = this._bsModalService.show(template);
  }

  addSubcategory(form) {
    this._commonService.showloader();
    form.id = this.categoryList[this.selectedCategoryIndex].id;
    this._dashboardService.addSubcategory(form).subscribe(
      (res) => {
        if (res.status) {
          const obj = {
            subcategory: form.subcategory_name,
          };
          this.categoryList[this.selectedCategoryIndex].subcategory_list.push(
            obj
          );
          this.modalRef.hide();
          this._toastrService.success(
            'subcategory successfully added',
            'Success'
          );
        }
        this._commonService.hideloader();
      },
      (err) => {
        this._commonService.hideloader();
        this._toastrService.error(err.error.message, 'Success');
      }
    );
  }

  deleteCategoryHandler() {
    this._commonService.showloader();
    this._dashboardService
      .deleteCategory(this.categoryList[this.selectedCategoryIndex].id)
      .subscribe(
        (res) => {
          if (res.status) {
            this.categoryList.splice(parseInt(this.selectedCategoryIndex), 1);
            this.modalRef.hide();
            this._toastrService.success(
              'category successfully deleted',
              'Success'
            );
          }
          this._commonService.hideloader();
        },
        (err) => {
          this._commonService.hideloader();
          this._toastrService.error(err.error.message, 'Success');
        }
      );
  }

  addNewcategory(form) {
    this._commonService.showloader();
    this._dashboardService.addCategory(form).subscribe(
      (res) => {
        if (res.status) {
          this.categoryList.push(res.data.category);
          console.log(this.categoryList);
          this.modalRef.hide();
          this._toastrService.success('category successfully added', 'Success');
        }
        this._commonService.hideloader();
      },
      (err) => {
        this._commonService.hideloader();
        this._toastrService.error(err.error.message, 'Success');
      }
    );
  }
}
