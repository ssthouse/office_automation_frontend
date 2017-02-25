import * as types from '../mutation-types'

const state = {
  // 个人板块 全局状态
  tools_tabs: []
}

const mutations = {
  // 增加调查问卷的 tab
  [types.ADD_QUESTIONNAIRE_TAB] (state, contentIs) {
    console.debug(contentIs)
    state.tools_tabs.push({
      label: '创建调查问卷',
      contentIs: contentIs
    })
  },
  // 移除某一个 tab
  [types.PORTAL_REMOVE_TAB] (state, tabIndex) {
    // TODO 这里没办法对 tab 进行移除  饿了吗没给接口===> 会导致 tab 越来越多 希望不会有问题
  }
}

export default {
  state,
  mutations
}
