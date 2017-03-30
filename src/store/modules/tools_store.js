import * as types from '../mutation-types'
import Vue from 'vue'

import QuestionnaireFill from '../../components/tools/questionnaire/QuestionnaireFill.vue'
import Questionnaire from '../../components/tools/questionnaire/Questionnaire.vue'

const state = {
  // 个人板块 全局状态
  allTabs: [],
  // 用户可以参加的questionnaire
  questionnaireList: [],
  // 用户创建的questionnaire
  ownedQuestionnaireList: []
}

const tabIsSet = new Set()
const tabExcludedSet = new Set([Questionnaire.name, QuestionnaireFill.name])

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
  },
  // 移除tab
  [types.TOOLS_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  },
  // set questionnaire list
  [types.TOOLS_SET_OPEN_QUESTIONNAIRE_LIST] (state, openList) {
    state.questionnaireList = openList
  },
  [types.TOOLS_SET_OWNED_QUESTIONNAIRE_LIST] (state, ownedList) {
    state.ownedQuestionnaireList = ownedList
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
          context.commit(types.TOOLS_SET_OPEN_QUESTIONNAIRE_LIST, success.body.data.questionnaireList)
          context.commit(types.TOOLS_SET_OWNED_QUESTIONNAIRE_LIST, success.body.data.ownedQuestionnaireList)
          resolve('问卷数据获取成功')
        }, function (error) {
          reject(error.msg)
        })
    })
  },
  /**
   * 更新questionnaire到数据库
   * @param context
   * @param questionnaire 需要更新的questionnaire
   * @returns {Promise}
   */
  [types.ACTION_UPDATE_QUESTIONNAIRE_TO_DATABASE]: function (context, questionnaire) {
    return new Promise((resolve, reject) => {
      // TODO save
    })
  }
}

const getters = {
  getQuestionnaireList: (state) => {
    return state.questionnaireList == null ? [] : state.questionnaireList
  },
  getOwnedQuestionnaireList: (state) => {
    return state.ownedQuestionnaireList == null ? [] : state.ownedQuestionnaireList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
