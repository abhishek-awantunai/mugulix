export const CONFIG = {
  BASE_URL: 'http://192.168.0.110:4242/api',
  // BASE_URL: 'http://localhost:4242/api',
  API: {
    AUTH: {
      LOGIN: '/admin/login',
      SIGNUP: '/admin/sign-up',
      LOGOUT: '/admin/logout',
    },
    DASHBOARD: {
      PRODUCT_LIST: '/admin/product/list',
      ADD_PRODUCT: '/admin/product/add',
      DELETE_PRODUCT: '/admin/product/delete',
      UPDATE_PRODUCT: '/admin/product/update',
      CATEGORY_LIST: '/admin/category/list',
      ADD_CATEGORY: '/admin/category/add',
      DELETE_SUBCATEGORY: '/admin/category/delete',
      ADD_SUBCATEGORY: '/admin/category/add-subcategory',
      GET_HOME_DATA: '/moglix/home/get-product-list',
      UPDATE_HOME_DATA: '/moglix/home/update-home-data',
    },
  },
};
