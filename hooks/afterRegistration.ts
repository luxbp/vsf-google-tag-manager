import rootStore from '@vue-storefront/core/store'
import {KEY} from '../index';
import {SET_STATUS, SET_UNSUBSCRIBERS} from '../store/mutation-types'
import RouteChangeSubscriber from '../subscribers/custom/RouteChangeSubscriber';
import ProductAddToCartSubscriber from '../subscribers/ProductAddToCartSubscriber';
import ProductRemoveFromCartSubscriber from '../subscribers/ProductRemoveFromCartSubscriber';
import ProductDetailSubscriber from '../subscribers/ProductDetailsSubscriber';
import TransactionSubscriber from '../subscribers/TransactionSubscriber';
import ProductClickSubscriber from '../subscribers/ProductClickSubscriber';
import SourceSubscriber from '../subscribers/custom/SourceSubscriber';
import ProductImpressionSubscriber from '../subscribers/ProductImpressionSubscriber';
import PromotionImpression from '../subscribers/PromotionImpression';
import PromotionClicks from '../subscribers/PromotionClicks';
import CategoryImpressionSubscriber from '../subscribers/custom/CategoryImpressionSubscriber';
import CheckoutFunnelSubscriber from '../subscribers/CheckoutFunnelSubscriber';
import CartStateSubscriber from '../subscribers/custom/CartStateSubscriber';

declare const window;

const injectJs = function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  let f = d.getElementsByTagName(s)[0];
  let j = d.createElement(s);
  let dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
}

export function afterRegistration ({Vue, config, store, isServer}) {
  if (!isServer && config.googleTagManager && config.googleTagManager.id) {
    if (!store.state[KEY].registered) {
      injectJs(window, document, 'script', 'dataLayer', config.googleTagManager.id);
      rootStore.commit(KEY + '/' + SET_STATUS, true)
    }

    window.dataLayer = window.dataLayer || [];

    let subscribers = [
      RouteChangeSubscriber,
      CategoryImpressionSubscriber,
      ProductImpressionSubscriber,
      ProductClickSubscriber,
      ProductDetailSubscriber,
      CartStateSubscriber,
      ProductAddToCartSubscriber,
      ProductRemoveFromCartSubscriber,
      CheckoutFunnelSubscriber,
      TransactionSubscriber,
      SourceSubscriber,
      PromotionImpression,
      PromotionClicks
    ];

    subscribers.map(register => register(store));

    rootStore.commit(KEY + '/' + SET_UNSUBSCRIBERS, subscribers)
  }
}
