import * as types from '../mutation-types'
import * as EventBus from '../../components/base/EventBus'

const state = {
  workflow_tabs: []
}

const tabIsSet = new Set()
// const tabExcludedSet = new Set()

const mutations = {
  [types.WORKFLOW_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.workflow_tabs.push(tabItem)
    // emit new tab event
    EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_NEW_TAB)
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
