import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import {Route} from 'vue-router'

declare const dataLayer

export default (to: Route, from: Route): void => {
    try {
        if (!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }
        dataLayer.push({
            'event': 'virtualPageView',
            'page': {
                to: {...to},
                from: {...from}
            }
        });
    } catch (e) {
        console.error(e.message)
    }
}
