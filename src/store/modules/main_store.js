import Vue from 'vue'
import * as types from '../mutation-types.js'
import * as Cons from '../../components/base/Constant'
import {EventBus} from '../../components/base/EventBus'

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
  },
  [types.MAIN_SET_USER_CONFIG] (state, userConfig) {
    if (userConfig === null || userConfig === undefined) {
      return
    }
    state.userConfig = userConfig
    EventBus.$emit(Cons.EVENT_MAIN_UPDATE_USER_CONFIG)
  }
}

const getters = {
  getHomePageConfig (state) {
    if (state.userConfig.homePageConfig === null ||
      state.userConfig.homePageConfig === undefined ||
      state.userConfig.homePageConfig.length === 0) {
      let allState = [Cons.TOOLS_QUESTIONNAIRE, Cons.TOOLS_QUESTIONNAIRE_ADMIN,
        Cons.TOOLS_VOTING, Cons.TOOLS_VOTING_ADMIN]
      state.userConfig.homePageConfig = allState.join(',')
    }
    return state.userConfig.homePageConfig.split(',')
  },
  getToolsPageConfig (state) {
    if (state.userConfig.toolsPageConfig === null ||
      state.userConfig.toolsPageConfig === undefined ||
      state.userConfig.toolsPageConfig.length === 0) {
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
      Vue.http.get(Cons.BASE_URL + '/user/info')
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
  },
  [types.ACTION_GET_USER_CONFIG] (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get(Cons.BASE_URL + '/user_config/detail')
        .then(response => {
          if (response.body.ok !== true) {
            reject(response.body.msg)
          } else {
            context.commit(types.MAIN_SET_USER_CONFIG, response.body.userConfig)
            resolve('获取用户配置信息成功')
          }
        }, response => {
          reject('获取用户配置信息失败')
        })
    })
  },
  [types.ACTION_POST_USER_CONFIG_HOMEPAGE] (context, homePageConfig) {
    return new Promise((resolve, reject) => {
      context.state.userConfig.homePageConfig = homePageConfig
      Vue.http.post(Cons.BASE_URL + '/user_config/update', JSON.stringify(context.state.userConfig))
        .then(response => {
          if (response.body.ok !== true) {
            reject('更新用户配置失败')
          } else {
            resolve('更新用户数据成功')
          }
        }, response => {
          reject('更新用户配置失败')
        })
    })
  },
  [types.ACTION_POST_USER_CONFIG_TOOLS] (context, toolsPageConfig) {
    return new Promise((resolve, reject) => {
      context.state.userConfig.toolsPageConfig = toolsPageConfig
      console.log(JSON.stringify(context.state.userConfig))
      Vue.http.post(Cons.BASE_URL + '/user_config/update', JSON.stringify(context.state.userConfig))
        .then(response => {
          if (response.body.ok !== true) {
            reject('更新用户配置失败')
          } else {
            resolve('更新用户数据成功')
          }
        }, response => {
          reject('更新用户配置失败')
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
