import rootStore from '@vue-storefront/core/store';

export default (product): string => {
  let currentCategory = null;
  if (rootStore.state.category) {
    currentCategory = rootStore.state.category.current || false;
    if (!product.category) {
      return currentCategory ? currentCategory.name : null
    }

    for (let category of product.category) {
      if (category.category_id === currentCategory.id) { // Not 'Wszystkie produkty'
        return category.name
      }
    }
  }

  return null
}
