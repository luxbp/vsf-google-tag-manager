import rootStore from '@vue-storefront/core/store';

declare const dataLayer;

export default (stepIndex: number, option: String, products: Array<any>): void => {
  dataLayer.push({
    'event': 'checkout',
    'ecommerce': {
      'checkout': {
        'actionField': {'step': stepIndex, 'option': option},
        'products': products.map(product => ({
          id: product.sku,
          name: product.name,
          variant: product.childName ? product.childName : product.name,
          price: product.specialPriceInclTax && product.specialPriceInclTax > 0
            ? product.specialPriceInclTax
            : product.priceInclTax,
          category: rootStore.state.config.googleTagManager.brand,
          quantity: product.qty
        }))
     }
   }
  });
}