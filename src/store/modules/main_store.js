import Vue from 'vue'
import * as types from '../mutation-types.js'

const state = {
  user: {
    name: '用户名',
    username: 'username'
  }
}

const mutations = {
  [types.MAIN_SET_USER] (state, user) {
    state.user = user
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
  actions
}
