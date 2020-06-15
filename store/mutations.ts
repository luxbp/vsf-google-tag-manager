import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.SET_STATUS] (state, status) {
    state.registered = status
  },
  [types.SET_SOURCE] (state, source) {
    this[types.SET_LAST_SOURCE](state.source);
    state.source = source
  },
  [types.SET_LAST_SOURCE] (state, source) {
    state.last_source = source
  },
  [types.SET_UNSUBSCRIBERS] (state, unsubscribers) {
    state.unsubscribers = unsubscribers
  }
};
