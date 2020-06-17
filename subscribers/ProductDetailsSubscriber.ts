import createProductData from '../helper/createProductData';
import rootStore from '@vue-storefront/core/store'
import {KEY} from '../index';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('recently-viewed/recently-viewed/ADD')) {
    dataLayer.push({
      'ecommerce': {
        'detail': {
          'actionField': {'list': rootStore.state[KEY].source || null},
          'products': [createProductData(mutation.payload.product)]
        }
      }
    });
  }
})
