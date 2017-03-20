import * as types from '../mutation-types'

const state = {
  // 个人板块 全局状态
  allTabs: []
}

const tabIsSet = new Set()

const mutations = {
  // 增加tab
  [types.TOOLS_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.allTabs.push(tabItem)
  },
  [types.TOOLS_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

export default {
  state,
  mutations
}
