import Vue from 'vue'
import Vuex from 'vuex'

import homePageModule from './modules/homepage_store'
import workflowModule from './modules/workflow_store'
import officialDocModule from './modules/official_doc_store'
import toolsModule from './modules/tools_store'
// main store
import mainModule from './modules/main_store'

// 配置 VUEX
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  debug,
  state: {},
  modules: {
    homePageModule,
    workflowModule,
    officialDocModule,
    toolsModule,
    // main module
    mainModule
  },
  getter: {}
})
