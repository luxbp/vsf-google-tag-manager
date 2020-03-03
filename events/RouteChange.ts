import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import {Route} from 'vue-router'

declare const dataLayer

export default (to: Route, from: Route): void => {

    let keys = ['name', 'path', 'fullPath', 'query', 'params', 'meta']
    let pick = (obj, keys) => {
        return keys.map(k => k in obj ? {[k]: obj[k]} : {})
            .reduce((res, o) => Object.assign(res, o), {});
    }

    try {
        if (!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }

        dataLayer.push({
            event: 'virtualPageView',
            page: {
                to: pick(to, keys),
                from: pick(from, keys)
            }
        });
    } catch (e) {
        console.error(e.message)
    }
}
