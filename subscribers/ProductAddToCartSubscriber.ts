import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import createProductData from "../helper/createProductData";

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const currency = state.storeView.i18n.currencyCode;
  if (type.endsWith('cart/cart/ADD')) { // todo replace with mutation type const
    dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': currency,
        'add': {                                // 'add' actionFieldObject measures.
          'products': [createProductData(mutation.payload.product)]
        }
      }
    });
  }
})
