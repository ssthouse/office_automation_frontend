import * as types from '../mutation-types'
import * as EventBus from '../../components/base/EventBus'

const state = {
  workflow_tabs: [],
  // 请假列表
  askLeaveList: [],
  askLeaveAdminList: [],
  // 加班列表
  workOvertimeList: [],
  workOvertimeAdminList: [],
  // 出差列表
  outingList: [],
  outingAdminList: []
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
  },
  // the mutations to commit list data
  [types.WORKFLOW_SET_ASK_LEAVE] (state, askLeaveList) {
    state.askLeaveList = askLeaveList
  },
  [types.WORKFLOW_SET_ASK_LEAVE_ADMIN] (state, askLeaveAdminList) {
    state.askLeaveAdminList = askLeaveAdminList
  },
  [types.WORKFLOW_SET_WORK_OVERTIME] (state, workOvertimeList) {
    state.workOvertimeList = workOvertimeList
  },
  [types.WORKFLOW_SET_WORK_OVERTIME_ADMIN] (state, workOvertimeAdminList) {
    state.workOvertimeAdminList = workOvertimeAdminList
  },
  [types.WORKFLOW_SET_OUTING] (state, outingList) {
    state.outingList = outingList
  },
  [types.WORKFLOW_SET_OUTING_ADMIN] (state, outingAdminList) {
    state.outingAdminList = outingAdminList
  }
}

export default {
  state,
  mutations
}
