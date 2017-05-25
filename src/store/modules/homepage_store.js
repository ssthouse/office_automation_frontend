import * as types from '../mutation-types'
import * as EventBus from '../../components/base/EventBus'
import * as Cons from '../../components/base/Constant'
import Vue from 'vue'

// 所有的数据
const state = {
  allTabs: [],
  // 日程管理的数据
  todoList: []
}

const tabIsSet = new Set()

const mutations = {
  // 添加tab
  [types.HOMEPAGE_ADD_TAB] (state, tabItem) {
    if (tabIsSet.has(tabItem.tabIs)) {
      return
    }
    tabIsSet.add(tabItem.tabIs)
    state.allTabs.push(tabItem)
    EventBus.instance.$emit(EventBus.EVENT_HOMEPAGE_NEW_TAB)
  },
  // 移除tab
  [types.HOMEPAGE_REMOVE_TAB] (state, tabIs) {
    if (tabIsSet.has(tabIs)) {
      tabIsSet.delete(tabIs)
    }
  },
  // 设置日程数据
  [types.HOMEPAGE_SET_TODO_LIST] (state, todoList) {
    if (todoList === undefined) {
      return
    }
    state.todoList = todoList
  }
}

const actions = {
  [types.HOMEPAGE_ACTION_UPDATE_TODO_LIST] (context) {
    return new Promise((resolve, reject) => {
      Vue.http.get(Cons.BASE_URL + '/todo/todo_list')
        .then(response => {
          if (response.body.ok !== true) {
            reject('获取日程数据失败')
            return
          }
          context.state.todoList = response.body.todoList
          console.log(response.body.todoList)
          resolve('获取日程数据成功')
        }, response => {
          reject('获取日程数据失败')
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
