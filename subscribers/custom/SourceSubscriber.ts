import rootStore from '@vue-storefront/core/store'
import {isServer} from '@vue-storefront/core/helpers'
import {SET_SOURCE} from "../../store/mutation-types";

export default (store) => store.subscribe((mutation, state) => {
  const type = mutation.type;
  const payload = mutation.payload;

  const setSource = (source) => {
    rootStore.commit('vsf-google-tag-manager/' + SET_SOURCE, source)
  };

  if (type.endsWith('ui/setSearchpanel') && payload) {
    setSource('Search')
  }

  if (type.endsWith('ui/setSearchpanel') && !payload) {
    setSource(store.state['vsf-google-tag-manager'].last_source)
  }

  if (type.endsWith('route/ROUTE_CHANGED')) {
    if (payload.to.path === '/') {
      setSource('Homepage')
    }
  }
})
