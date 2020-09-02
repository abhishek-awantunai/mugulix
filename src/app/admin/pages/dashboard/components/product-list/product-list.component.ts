import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/commonService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  category: number;
  subcategory: number;
  modalRef: BsModalRef;
  productList: Array<any>;
  categoryList: Array<any>;
  selectedProductIndex: number;
  selectedProduct: any;

  constructor(
    private _dashboardService: DashboardService,
    private _bsModalService: BsModalService,
    private _toastrService: ToastrService,
    private _commonService: CommonService
  ) {
    this.category = -1;
    this.subcategory = -1;
    this.productList = [];
    this.categoryList = [];
    this.selectedProductIndex = -1;
    this.resetSelectedProduct();
  }

  categorySelected() {
    if (this.category == -1) {
      this.getProductList();
    }
  }

  filterProductData() {
    const category = this.categoryList[this.category].id;
    const sub_category = this.categoryList[this.category].subcategory_list[
      this.subcategory
    ].id;
    const filterData = {
      category,
      sub_category,
    };
    this.getProductList(filterData);
  }

  updateSubcat() {
    this.selectedProduct.sub_categoryId = '0';
  }

  resetSelectedProduct() {
    this.selectedProduct = {
      name: '',
      categoryId: '-1',
      sub_categoryId: '0',
      brand: '',
      price: '',
      quantity: '',
      specification: '',
    };
  }

  setSelectedProduct(productIndex) {
    this.selectedProduct = JSON.parse(
      JSON.stringify(this.productList[productIndex])
    );

    const categoryIndex = this.categoryList.findIndex(
      (c) => c.category_name === this.productList[productIndex].category
    );

    categoryIndex
      ? (this.selectedProduct.category = categoryIndex)
      : (this.selectedProduct.category = '-1');
  }

  ngOnInit(): void {
    this.getProductList();
    this.getCategoryist();
  }

  currentPage: number = 1;
  paginationArray: Array<Boolean>;
  showPagination: Boolean = false;
  createPagination(data) {
    this.showPagination = data['next'] > 1 || data['prev'] > 2;
    if (this.showPagination) {
      this.currentPage = data['next'] - 1 || data['prev'] + 1;
      this.paginationArray = new Array(data['count']).fill(false);
      this.currentPage > 0
        ? (this.paginationArray[this.currentPage - 1] = true)
        : (this.paginationArray[0] = true);
    }
  }

  updatePage(page) {
    if (page === 'prev') {
      this.page = this.currentPage + 1;
    } else if (page === 'next') {
      this.page = this.currentPage + 1;
    } else {
      this.page = page;
    }
    this.getProductList();
  }

  page: number = 1;
  limit: number = 16;
  getProductList(filterData?: any) {
    this._commonService.showloader();
    this._dashboardService
      .getProductList(this.page, this.limit, filterData)
      .subscribe(
        (res) => {
          this.productList = res.data.results;
          this.createPagination(res.data);
          this._commonService.hideloader();
        },
        (err) => {
          this._toastrService.error(err.error.message, 'Error');
          this._commonService.hideloader();
        }
      );
  }

  getCategoryist() {
    this._commonService.showloader();
    this._dashboardService.getCatagoryList().subscribe(
      (res) => {
        this.categoryList = res.data;
        this._commonService.hideloader();
      },
      (err) => {
        this._toastrService.error(err.error.message, 'Error');
        this._commonService.hideloader();
      }
    );
  }

  openModal(template: TemplateRef<any>, index: number = -1) {
    this.modalRef = this._bsModalService.show(template);
    this.selectedProductIndex = index;

    index > -1 ? this.setSelectedProduct(index) : this.resetSelectedProduct();
  }

  addProduct(form) {
    this._commonService.showloader();

    if (form.category === '-1' || form.sub_category === '0') {
      this._toastrService.error(
        'Please select a category and coressponding subcategory',
        'Error'
      );
      return;
    }

    const form_data = { ...form };
    this.selectedProductIndex > -1
      ? (form_data.id = this.productList[this.selectedProductIndex].id)
      : null;
    form_data.category = this.categoryList[form.category].id;

    this._dashboardService
      .addProduct(form_data, this.selectedProductIndex)
      .subscribe(
        (res) => {
          if (res.status) {
            if (this.selectedProductIndex > -1) {
              this._toastrService.success(
                'product updated successfully',
                'Success'
              );

              const catId = res.data.category;
              const cat = this.categoryList.filter(
                (cat) => cat.id === catId
              )[0];

              res.data.category = cat['category_name'];
              res.data.categoryId = this.findWithAttr(
                this.categoryList,
                'id',
                catId
              );

              const subcat = cat['subcategory_list'].filter(
                (subcat) => subcat.id === res.data['sub_category']
              )[0];

              res.data.sub_category = subcat['subcategory'];
              res.data.sub_categoryId = subcat['id'];
              this.productList[this.selectedProductIndex] = res.data;
            } else {
              this._toastrService.success(
                'product successfully added',
                'Success'
              );

              const data = this.categoryList.filter(
                (cat) => cat.id === res.data.category
              );
              res.data.category = data[0]['category_name'];
              res.data.sub_category = data[0]['subcategory_list'].filter(
                (subcat) => subcat.id === res.data['sub_category']
              )[0]['subcategory'];
              this.productList.push(res.data);
            }
          }
          this.modalRef.hide();
          this._commonService.hideloader();
        },
        (err) => {
          this._toastrService.error(err.error.message, 'Error');
          this._commonService.hideloader();
        }
      );
  }

  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  deleteProductHandler() {
    this._commonService.showloader();
    this._dashboardService
      .deleteProduct(this.productList[this.selectedProductIndex].id)
      .subscribe(
        (res) => {
          if (res.status) {
            this.productList.splice(this.selectedProductIndex, 1);
            this.modalRef.hide();
            this._toastrService.success(
              'product successfully deleted',
              'Success'
            );
          }
          this._commonService.hideloader();
        },
        (err) => {
          this._toastrService.error(err.error.message, 'Error');
          this._commonService.hideloader();
        }
      );
  }
}
