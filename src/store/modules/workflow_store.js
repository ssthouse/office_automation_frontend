import * as types from '../mutation-types'

const state = {
  workflow_tabs: []
}

const mutations = {
  [types.WORKFLOW_REMOVE_TAB] (state, tabIndex) {
    console.debug(tabIndex)
  },
  [types.WORKFLOW_ADD_TAB] (state, contentIs) {
    console.debug('   ' + contentIs)
    state.workflow_tabs.push({
      label: 'testTitle',
      contentIs
    })
  }
}

export default {
  state,
  mutations
}
