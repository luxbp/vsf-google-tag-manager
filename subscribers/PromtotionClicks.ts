import * as types from '@vue-storefront/core/modules/order/store/mutation-types';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  // stub
  let promoObj: any = {}
  if (type.endsWith(types.ORDER_PLACE_ORDER)) {
    dataLayer.push({
      'event': 'promotionClick',
      'ecommerce': {
        'promoClick': {
          'promotions': [
            {
              'id': promoObj.id,                         // Name or ID is required.
              'name': promoObj.name,
              'creative': promoObj.creative,
              'position': promoObj.pos
            }]
        }
      },
      'eventCallback': function () {
        document.location = promoObj.destinationUrl;
      }
    });
  }
})
