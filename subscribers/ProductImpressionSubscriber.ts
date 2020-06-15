import * as types from '@vue-storefront/core/modules/order/store/mutation-types';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;
  if (type.endsWith('product/product/UPD_RELATED')) {
    dataLayer.push({
      'ecommerce': {
        'currencyCode': 'EUR',                       // Local currency is optional.
        'impressions': [
          {
            'name': 'Triblend Android T-Shirt',       // Name or ID is required.
            'id': '12345',
            'price': '15.25',
            'brand': 'Google',
            'category': 'Apparel',
            'variant': 'Gray',
            'list': 'Search Results',
            'position': 1
          },
          {
            'name': 'Donut Friday Scented T-Shirt',
            'id': '67890',
            'price': '33.75',
            'brand': 'Google',
            'category': 'Apparel',
            'variant': 'Black',
            'list': 'Search Results',
            'position': 2
          }]
      }
    });
  }
})
