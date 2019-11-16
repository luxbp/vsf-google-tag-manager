import { ProductData } from '../types/ProductData';
import productCategoryName from '../util/productCategoryName';
import rootStore from '@vue-storefront/core/store';

declare const dataLayer;

export default (product, source: string): void => {
  try {
    if (!('dataLayer' in window)) {
      throw new Error('GTM not installed');
    }

    let category = productCategoryName(product);

    const productData: ProductData = {
      name: product.name,
      id: product.sku,
      price: product.specialPriceInclTax && product.specialPriceInclTax > 0
        ? product.specialPriceInclTax
        : product.priceInclTax,
      brand: rootStore.state.config.googleTagManager.brand,
      category,
      variant: product.childName ? product.childName : product.name,
      quantity: 1
    };

    dataLayer.push({
      ecommerce: {
        detail: {
          actionField: { list: source },
          products: [productData]
        }
      }
    });
  } catch (e) {
    console.error(e.message);
  }
};
