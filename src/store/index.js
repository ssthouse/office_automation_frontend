import Vue from 'vue'
import Vuex from 'vuex'
import portalModule from './modules/portal'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  debug,
  state: {},
  modules: {
    portalModule
  },
  getter: {}
})
