import * as types from '../mutation-types'

const state = {
  workflow_tabs: []
}

const mutations = {
  [types.WORKFLOW_REMOVE_TAB] (state, tabIndex) {
    console.debug(tabIndex)
  },
  [types.WORKFLOW_ADD_TAB] (state, tabItem) {
    console.debug('   ' + tabItem.tabIs)
    state.workflow_tabs.push(tabItem)
  }
}

export default {
  state,
  mutations
}
