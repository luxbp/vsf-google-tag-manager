import {currentStoreView} from '@vue-storefront/core/lib/multistore'
import createProductData from '../helper/createProductData';
import {
  CATALOG_UPD_PRODUCTS,
  CATALOG_UPD_RELATED
} from '@vue-storefront/core/modules/catalog/store/product/mutation-types';

declare const dataLayer;

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;
  const storeView = currentStoreView();
  if (type.endsWith(CATALOG_UPD_RELATED)) { // Related Products
    dataLayer.push({
      'ecommerce': {
        'currencyCode': storeView.i18n.currencyCode,
        'impressions': payload.items.map((product, index) => createProductData(product, {position: index}))
      }
    });
  }

  if (type.endsWith(CATALOG_UPD_PRODUCTS)) { // Category Pages
    dataLayer.push({
      'ecommerce': {
        'currencyCode': storeView.i18n.currencyCode,
        'impressions': payload.products.map((product, index) => createProductData(product, {position: index}))
      }
    });
  }
  // todo featured carousel impression
})
