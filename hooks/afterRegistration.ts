import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { once } from '@vue-storefront/core/helpers';
import ProductImpression from '../events/ProductImpression'
import ScrollStop from 'src/modules/google-analytics/util/ScrollStop';

const injectJs = function(w,d,s,l,i,cb) {
  w[l]=w[l]||[];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0], j=d.createElement(s),
      dl = l != 'dataLayer' ? '&l='+l : ''; 
  j.async=true;
  j.src= 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  j.onload = cb
  f.parentNode.insertBefore(j, f);
}

const state = {
  impressions: []
}

export function afterRegistration({ Vue, config, store, isServer }){
  if (!isServer && config.googleTagManager && config.googleTagManager.id) {
      once('__GTM__REGISTER__', () => {
        injectJs(window, document, 'script', 'dataLayer', config.googleTagManager.id, () => {
          
        });

        EventBus.$on('gtm-impression', (product) => {
          state.impressions.push(product)
          if (state.impressions.length >= 10) {
            ProductImpression(state.impressions, store.state.storeView.i18n.currencyCode)
            state.impressions = []
          }
        })

        ScrollStop(() => {
          setTimeout(() => {
            // Sending them on stop scroll, when there are more than 0 in queue
            if (state.impressions && state.impressions.length > 0) {
              ProductImpression(state.impressions, store.state.storeView.i18n.currencyCode)
              state.impressions = []
            }
          }, 1000)
        })
      })

  }
}
