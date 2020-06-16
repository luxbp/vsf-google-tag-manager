import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import GTMState from '../types/GTMState';

export const mutations: MutationTree<GTMState> = {
  [types.SET_STATUS] (state, status) {
    state.registered = status
  },
  [types.SET_SOURCE] (state, source) {
    state.last_source = state.source;
    state.source = source
  },
  [types.SET_UNSUBSCRIBERS] (state, unsubscribers) {
    state.unsubscribers = unsubscribers
  }
};
