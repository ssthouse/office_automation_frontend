import * as types from '../mutation-types'

// 所有的数据
const state = {
  all_tabs: []
}

const tabIsSet = new Set()

const mutations = {
  // 添加tab
  [types.HOMEPAGE_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.all_tabs.push(tabItem)
  },
  // 移除tab
  [types.HOMEPAGE_REMOVE_TAB] (state, tabIs) {
    console.log(tabIs)
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

export default {
  state,
  mutations
}
