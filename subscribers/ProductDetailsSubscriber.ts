import createProductData from '../helper/createProductData';
import {CATALOG_SET_PRODUCT_CURRENT} from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import rootStore from '@vue-storefront/core/store'
import {KEY} from '../index';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith(CATALOG_SET_PRODUCT_CURRENT)) {
    dataLayer.push({
      'ecommerce': {
        'detail': {
          'actionField': {'list': rootStore.state[KEY].source || null},
          'products': [createProductData(mutation.payload)]
        }
      }
    });
  }
})
