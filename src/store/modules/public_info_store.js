import * as types from '../mutation-types'

const state = {
  allTabs: []
}

const mutations = {
  [types.PUBLIC_INFO_ADD_TAB] (state, tabItem) {
    console.debug(tabItem.tabIs)
    state.allTabs.push(tabItem)
  }
}

export default {
  state,
  mutations
}
