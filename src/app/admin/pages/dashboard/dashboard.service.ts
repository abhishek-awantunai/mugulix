import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { CONFIG } from '../../../configs/js/base.url';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _dataService: DataService) {}

  // User Api calls

  logoutUser() {
    return this._dataService.post(CONFIG.BASE_URL + CONFIG.API.AUTH.LOGOUT, {});
  }

  // Home API calls
  getHomeApidata() {
    return this._dataService.get(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.GET_HOME_DATA
    );
  }

  updateHomeApi(data) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.UPDATE_HOME_DATA,
      data
    );
  }

  // Product API calls
  getProductList(page: number, limit: number, filterData?: any) {
    let url = CONFIG.BASE_URL + CONFIG.API.DASHBOARD.PRODUCT_LIST;
    if (filterData) {
      let i = 0;
      for (const key in filterData) {
        if (filterData.hasOwnProperty(key)) {
          url +=
            i === 0
              ? '?' + key + '=' + filterData[key]
              : '&' + key + '=' + filterData[key];
          i++;
        }
      }
      url += `&page=${page}&limit=${limit}`;
    } else {
      url += `?page=${page}&limit=${limit}`;
    }

    return this._dataService.get(url);
  }

  addProduct(data, type) {
    let url =
      type < 0
        ? CONFIG.BASE_URL + CONFIG.API.DASHBOARD.ADD_PRODUCT
        : CONFIG.BASE_URL + CONFIG.API.DASHBOARD.UPDATE_PRODUCT;
    return this._dataService.post(url, { ...data });
  }

  deleteProduct(id) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.DELETE_PRODUCT,
      { id }
    );
  }

  // Category Api calls

  getCatagoryList() {
    return this._dataService.get(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.CATEGORY_LIST
    );
  }

  addSubcategory(data) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.ADD_SUBCATEGORY,
      { ...data }
    );
  }

  addCategory(data) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.ADD_CATEGORY,
      { ...data }
    );
  }

  deleteCategory(id) {
    return this._dataService.post(
      CONFIG.BASE_URL + CONFIG.API.DASHBOARD.DELETE_SUBCATEGORY,
      { id }
    );
  }
}
