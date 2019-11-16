import rootStore from '@vue-storefront/core/store';
import { isServer } from '@vue-storefront/core/helpers';
import { Route } from 'vue-router';

import evProductClick from '../events/ProductClick';
import evShoppingCart from '../events/ShoppingCart';

let registeredShoppingCart = false;

export function afterEach(to: Route, from: Route) {
  const currency = rootStore.state.storeView.i18n.currencyCode;

  // Each product's route has in name 'product' phrase!
  if (!isServer && to.meta && to.meta.componentName) {
    let source = 'Unset';
    switch (to.meta.componentName) {
    //   case 'category':
    //     categoryImperssion(
    //       rootStore.state.category.current.name,
    //       rootStore.state.product.list.items,
    //       currency
    //     );
    //     break;
      case 'product':
        if (from && from.name && JSON.stringify(from) !== JSON.stringify(to)) {
          evProductClick(rootStore.state.product.current, currency, source);
        }
        // evProductDetails(rootStore.state.product.current, source);

        break;
    }
    // if (rootStore.state.ui.searchpanel) {
    //   source = 'Search';
    // } else if (from.name !== null && from.name.match(/product/)) {
    //   source = 'Related products in other product';
    // } else {
    //   source = 'Category page';
    // }

    if (!registeredShoppingCart) {
      evShoppingCart(currency);
      registeredShoppingCart = true;
    }
  }
}
