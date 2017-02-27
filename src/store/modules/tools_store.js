import * as types from '../mutation-types'

const state = {
  // 个人板块 全局状态
  allTabs: []
}

const mutations = {
  // 增加tab
  [types.TOOLS_ADD_TAB] (state, tabItem) {
    state.allTabs.push(tabItem)
  }
}

export default {
  state,
  mutations
}
