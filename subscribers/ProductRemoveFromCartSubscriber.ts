import createProductData from '../helper/createProductData';

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith('cart/cart/DEL')) { // todo replace with mutation type const
    dataLayer.push({
      'event': 'removeFromCart',
      'ecommerce': {
        'remove': {
          'products': [createProductData(mutation.payload.product)]
        }
      }
    });
  }
})
