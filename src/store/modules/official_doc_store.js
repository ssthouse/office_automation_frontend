import * as types from '../mutation-types'

const state = {
  allTabs: []
}

const mutations = {
  [types.OFFICIAL_DOC_ADD_TAB]: function (state, tabItem) {
    console.debug('what i wrong!')
    state.allTabs.push(tabItem)
    console.debug(state.allTabs.length + '   ....')
  }
}

export default{
  state,
  mutations
}
