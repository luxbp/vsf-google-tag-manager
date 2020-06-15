import {Module} from 'vuex'
import GTMState from '../types/GTMState'
import {mutations} from './mutations'
import {state} from './state'

export const module: Module<GTMState, any> = {
  namespaced: true,
  mutations,
  state
};
