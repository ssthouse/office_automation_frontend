import * as types from '../mutation-types'

const state = {
  workflow_tabs: []
}

const mutations = {
  [types.WORKFLOW_REMOVE_TAB] (state, tabIndex) {
    console.error(tabIndex)
  },
  [types.WORKFLOW_ADD_TAB] (state, contentIs) {
    console.error('   ' + contentIs)
    state.workflow_tabs.push({
      title: 'testTitle',
      contentIs
    })
  }
}

export default {
  state,
  mutations
}
