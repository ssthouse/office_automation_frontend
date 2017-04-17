import * as types from '../mutation-types'
import * as EventBus from '../../components/base/EventBus'

const state = {
  allTabs: []
}

const tabIsSet = new Set()

const emitEvent = function () {
  EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_NEW_TAB)
}

const mutations = {
  [types.OFFICIAL_DOC_ADD_TAB]: function (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.allTabs.push(tabItem)
    emitEvent()
  },
  [types.OFFICIAL_DOC_REMOVE_TAB] (state, tabIs) {
    console.log(tabIs)
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

export default{
  state,
  mutations
}
