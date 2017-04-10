import Vue from 'vue'
import * as types from '../mutation-types.js'
import * as Cons from '../../components/base/Constant'

const state = {
  user: {
    name: '用户名',
    username: 'username'
  },
  userConfig: {
    // string arrays to define panel
    homePageConfig: '',
    toolsPageConfig: ''
  }
}

const mutations = {
  [types.MAIN_SET_USER] (state, user) {
    state.user = user
  }
}

const getters = {
  getHomePageConfig (state) {
    // TODO split str
    return state.userConfig.homePageConfig.split(',')
  },
  getToolsPageConfig (state) {
    if (state.userConfig.toolsPageConfig === null || state.userConfig.toolsPageConfig.length === 0) {
      let allState = [Cons.TOOLS_QUESTIONNAIRE, Cons.TOOLS_QUESTIONNAIRE_ADMIN,
        Cons.TOOLS_VOTING, Cons.TOOLS_VOTING_ADMIN]
      state.userConfig.toolsPageConfig = allState.join(',')
    }
    return state.userConfig.toolsPageConfig.split(',')
  }
}

const actions = {
  // 获取用户信息
  [types.ACTION_GET_USERINFO] (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8080/office_automation_backend/user/info')
        .then(response => {
          if (response.body.ok !== true) {
            reject(response.body.msg)
          } else {
            context.commit(types.MAIN_SET_USER, response.body.user)
            resolve('success!')
          }
        }, response => {
          reject('error!')
        })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
