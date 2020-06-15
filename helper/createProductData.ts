import rootStore from '@vue-storefront/core/store'
import createProductCategoryName from './createProductCategoryName';

export default (product, source = 'default', qty = 1) => {
  return {
    name: product.name,
    id: product.sku,
    price: product.priceInclTax,
    brand: product.brand || rootStore.state.config.defaultStoreCode,
    category: createProductCategoryName(product),
    list: source,
    variant: product.sku.split('-')[1],
    quantity: product.qty || qty
  }
}
