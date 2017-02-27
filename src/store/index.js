import Vue from 'vue'
import Vuex from 'vuex'

import homePageModule from './modules/homepage_store'
import workflowModule from './modules/workflow_store'
import publicInfoModule from './modules/public_info_store'
import toolsModule from './modules/tools_store'

// 配置 VUEX
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  debug,
  state: {},
  modules: {
    homePageModule,
    workflowModule,
    publicInfoModule,
    toolsModule
  },
  getter: {}
})
