import * as types from '../mutation-types'
import { EventBus } from '../../components/base/EventBus'
import * as Cons from '../../components/base/Constant'
import Vue from 'vue'

// questionnaire
import QuestionnaireFill from '../../components/tools/questionnaire/QuestionnaireFill.vue'
import Questionnaire from '../../components/tools/questionnaire/Questionnaire.vue'
import AnswerReport from '../../components/tools/questionnaire/QuestionnaireReport.vue'
// voting
import Voting from '../../components/tools/voting/Voting.vue'
import VotingFill from '../../components/tools/voting/VotingFill.vue'
import VotingReport from '../../components/tools/voting/VotingReport.vue'

const state = {
  // 个人板块 全局状态
  allTabs: [],
  // questionnaire
  questionnaireList: [],
  ownedQuestionnaireList: [],
  // voting
  openVotingList: [],
  ownedVotingList: [],
  // meeting
  meetingList: [],
  ownedMeetingList: []
}

const tabIsSet = new Set()
const tabExcludedSet = new Set([Questionnaire.name, QuestionnaireFill.name, AnswerReport.name,
  Voting.name, VotingFill.name, VotingReport.name])

const mutations = {
  // 增加tab
  [types.TOOLS_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    // the tab in excluded set can have more than one instance
    if (!tabExcludedSet.has(tabItem.tabIs)) {
      tabIsSet.add(tabItem.tabIs)
    }
    state.allTabs.push(tabItem)
    EventBus.$emit(Cons.EVENT_TOOLS_NEW_TAB)
  },
  // 移除tab
  [types.TOOLS_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  }
}

const actions = {
  /**
   * 获取questionnaire
   * @param context
   * @returns {Promise}
   */
  [types.ACTION_FETCH_QUESTIONNAIRE]: function (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8080/office_automation_backend/questionnaire/detail')
        .then(function (success) {
          if (success.body.ok !== true) {
            reject('获取问卷数据出错')
            return
          }
          // 设置数据到本地
          context.state.questionnaireList = success.body.data.questionnaireList
          context.state.ownedQuestionnaireList = success.body.data.ownedQuestionnaireList
          resolve('问卷数据获取成功')
        }, function (error) {
          reject(error.msg)
        })
    })
  },
  /**
   * 获取公开voting数据
   * @param context
   * @returns {Promise}
   */
  [types.ACTION_FETCH_OPEN_VOTING]: function (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8080/office_automation_backend/voting/open')
        .then(success => {
          if (success.body.ok !== true) {
            reject('获取投票数据出错')
            return
          }
          context.state.openVotingList = success.body.openVotingList
          resolve('获取投票模块数据成功')
        }, fail => {
          reject('获取投票数据出错')
        })
    })
  },
  /**
   * 获取管理者voting数据
   * @param context
   * @returns {Promise}
   */
  [types.ACTION_FETCH_OWNED_VOTING]: function (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8080/office_automation_backend/voting/owned')
        .then(success => {
          if (success.body.ok !== true) {
            reject('获取管理者voting数据失败')
            return
          }
          context.state.ownedVotingList = success.body.ownedVotingList
          resolve('获取管理者voting数据成功')
        }, fail => {
          reject('获取管理者voting数据失败')
        })
    })
  }
}

const getters = {
  getQuestionnaireList: (state) => {
    return state.questionnaireList === null ? [] : state.questionnaireList
  },
  getOwnedQuestionnaireList: (state) => {
    return state.ownedQuestionnaireList === null ? [] : state.ownedQuestionnaireList
  },
  getOpenVotingList: (state) => {
    return state.openVotingList === null ? [] : state.openVotingList
  },
  getOwnedVotingList: (state) => {
    return state.ownedVotingList === null ? [] : state.ownedVotingList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
