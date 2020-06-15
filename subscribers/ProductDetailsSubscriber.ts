import * as types from '@vue-storefront/core/modules/order/store/mutation-types';
import createProductData from '../helper/createProductData';
import createProductCategoryName from '../helper/createProductCategoryName';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('product/product/SET_PRODUCT_CURRENT')) {
    dataLayer.push({
      'ecommerce': {
        'detail': {
          'actionField': {'list': createProductCategoryName(mutation.payload)},
          'products': [createProductData(mutation.payload)]
        }
      }
    });
  }
})
