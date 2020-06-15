import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types';
import createProductData from "../helper/createProductData";

declare const dataLayer;

/**
 * Product Interaction
 * @param store
 */
export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;

  if (type.endsWith(types.CATALOG_SET_PRODUCT_ORIGINAL)) {
    dataLayer.push({
      'event': 'productClick',
      'ecommerce': {
        'click': {
          // 'actionField': {'list': 'Search Results'},      // Optional list property.
          'products': [createProductData(mutation.payload)]
        }
      }
    });
  }
})
