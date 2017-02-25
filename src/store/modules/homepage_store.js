import * as types from '../mutation-types'

// 所有的数据
const state = {
  all_tabs: []
}

const mutations = {
  [types.HOMEPAGE_ADD_TAB] (state, tabItem) {
    state.all_tabs.push(tabItem)
  }
}

export default {
  state,
  mutations
}
