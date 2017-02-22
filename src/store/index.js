import Vue from 'vue'
import Vuex from 'vuex'

import toolsModule from './modules/tools_store'
import workflowModule from './modules/workflow_store'

// 配置 VUEX
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  debug,
  state: {},
  modules: {
    toolsModule,
    workflowModule
  },
  getter: {}
})
