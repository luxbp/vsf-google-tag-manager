import rootStore from '@vue-storefront/core/store'
import {SET_STATUS, SET_UNSUBSCRIBERS} from '../store/mutation-types'
import RouteChangeSubscriber from '../subscribers/custom/RouteChangeSubscriber';
import ProductAddToCartSubscriber from '../subscribers/ProductAddToCartSubscriber';
import ProductRemoveFromCartSubscriber from '../subscribers/ProductRemoveFromCartSubscriber';
import ProductDetailSubscriber from '../subscribers/ProductDetailsSubscriber';
import TransactionSubscriber from '../subscribers/TransactionSubscriber';
import ProductClickSubscriber from '../subscribers/ProductClickSubscriber';
import SourceSubscriber from '../subscribers/custom/SourceSubscriber';
import {KEY} from '../index';

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
      store.commit(KEY + '/' + SET_STATUS, true)
    }

    window.dataLayer = window.dataLayer || [];

    let subscribers = [
      RouteChangeSubscriber,
      ProductClickSubscriber,
      ProductDetailSubscriber,
      ProductAddToCartSubscriber,
      ProductRemoveFromCartSubscriber,
      TransactionSubscriber,
      SourceSubscriber
    ];
    subscribers.map((register) => {
      register(store)
    });

    store.commit(KEY + '/' + SET_UNSUBSCRIBERS, subscribers)
  }
}
