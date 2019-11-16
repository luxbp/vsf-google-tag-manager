import rootStore from '@vue-storefront/core/store';
import { isServer } from '@vue-storefront/core/helpers';
import { Route } from 'vue-router';

import evProductClick from '../events/ProductClick';
import evShoppingCart from '../events/ShoppingCart';

let registeredShoppingCart = false;

export function afterEach(to: Route, from: Route) {
  const currency = rootStore.state.storeView.i18n.currencyCode;

  // Each product's route has in name 'product' phrase!
  if (
    !isServer &&
    to.meta &&
    to.meta.componentName &&
    to.meta.componentName === 'product'
  ) {
    let source;
    if (to.query && to.query.fromSearchResults) {
      source = 'Searchpanel';
    } else {
      switch (to.meta.componentName) {
        case 'category':
          source = 'Category';
          break;
        case 'product':
          source = "Product's view - Related";
          break;
        case 'home':
          source = 'Homepage';
          break;
        default:
          source = 'Unknown';
          break;
      }
    }
    evProductClick(rootStore.state.product.current, currency, source);

    if (!registeredShoppingCart) {
      evShoppingCart(currency);
      registeredShoppingCart = true;
    }
  }
}
