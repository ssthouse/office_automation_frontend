import * as types from '../mutation-types'

const state = {
  allTabs: []
}

const tabIsSet = new Set()

const mutations = {
  [types.OFFICIAL_DOC_ADD_TAB]: function (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.allTabs.push(tabItem)
  },
  [types.OFFICIAL_DOC_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

export default{
  state,
  mutations
}
