import createProductData from '../helper/createProductData';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const currency = currentStoreView().i18n.currencyCode;
  if (type.endsWith('cart/cart/ADD')) { // todo replace with mutation type const
    dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': currency,
        'add': {
          'products': [createProductData(mutation.payload.product)]
        }
      }
    });
  }
})
