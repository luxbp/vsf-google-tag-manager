import * as types from '@vue-storefront/core/modules/order/store/mutation-types';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('NOT_YET_IMPLEMENTED')) {
    dataLayer.push({
      'ecommerce': {
        'promoView': {
          'promotions': [                     // Array of promoFieldObjects.
            {
              'id': 'JUNE_PROMO13',            // ID or Name is required.
              'name': 'June Sale',
              'creative': 'banner1',
              'position': 'slot1'
            },
            {
              'id': 'FREE_SHIP13',
              'name': 'Free Shipping Promo',
              'creative': 'skyscraper1',
              'position': 'slot2'
            }]
        }
      }
    });
  }
})
