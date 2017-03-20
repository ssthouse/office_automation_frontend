import * as types from '../mutation-types'

const state = {
  workflow_tabs: []
}

const tabIsSet = new Set()

const mutations = {
  [types.WORKFLOW_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.workflow_tabs.push(tabItem)
  },
  [types.WORKFLOW_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

export default {
  state,
  mutations
}
