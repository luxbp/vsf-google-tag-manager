import rootStore from '@vue-storefront/core/store'
import {isServer} from '@vue-storefront/core/helpers'
import {Route} from 'vue-router'

import evProductClick from '../events/ProductClick'
import evProductDetails from '../events/ProductDetails'
import {categoryImperssion, searchImpression} from '../events/ProductImpression'
import evShoppingCart from '../events/ShoppingCart'
import evRouteChange from '../events/RouteChange';

let registeredShoppingCart = false

export function afterEach (to: Route, from: Route) {
  evRouteChange(to, from)

  const currency = rootStore.state.storeView.i18n.currencyCode

  let isProductPage = !!to.params.parentSku
  let isCategoryPage = !!to.params.category

  // Each product's route has in name 'product' phrase!
  if (!isServer && to.name !== null) {
    let source = null
    if (rootStore.state.ui.searchpanel) {
      source = 'Search'
    } else if (from.name !== null && from.name.match(/product/)) {
      source = 'Related products in other product'
    } else {
      source = 'Category page'
    }
    console.log(to)

    evRouteChange(to, from)

    if (to.name.match(/product/)) {
      evProductDetails(
        rootStore.state.product.current,
        currency,
        source
      )
    }
    if (to.name.match(/product/) && from.name !== null) {
      let source = null
      if (rootStore.state.ui.searchpanel) {
        source = "Search"
      } else if (from.name !== null && from.name.match(/product/)) {
        source = "Related products in other product"
      } else {
        source = "Category page"
      }
      evProductClick(
        rootStore.state.product.current,
        currency,
        source
      )
    } else if (to.name.match(/category/)) {
      let source = "Category page"

      categoryImperssion(
        rootStore.state.category.current.name,
        rootStore.state.product.list.items,
        currency
      )
    }

    if (!registeredShoppingCart) {
      evShoppingCart(currency)
      registeredShoppingCart = true
    }
  }
}
