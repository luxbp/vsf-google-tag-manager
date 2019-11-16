import rootStore from '@vue-storefront/core/store'

declare const dataLayer

export const addToCart = (product: any): void => {
  dataLayer.push({
    'event': 'addToCart',
    'ecommerce': {
      'currencyCode': rootStore.state.storeView.i18n.currencyCode,
      'add': {                              
        'products': [{
          ...product,
          brand: rootStore.state.config.googleTagManager.brand
        }]
      }
    }
  })
}

export const removeFromCart = (product: any): void => {
  dataLayer.push({
    'event': 'removeFromCart',
    'ecommerce': {
      'currencyCode': rootStore.state.storeView.i18n.currencyCode,
      'remove': {                              
        'products': [{
          ...product,
          brand: rootStore.state.config.googleTagManager.brand
        }]
      }
    }
  })
}