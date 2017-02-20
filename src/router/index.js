// 主模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 门户模块
import Portal from '../components/portal/Portal.vue'
import GroupPage from '../components/portal/pages/GroupPage.vue'
import Personal from '../components/portal/personal/Personal.vue'

// 个人信息模块
import UserInfo from '../components/user_info/UserInfo.vue'

// 初始化总路由
Vue.use(VueRouter)

const ROOT_PATH = '/'
const OA_SYSTEM = 'oa_system'
const OA_SYSTEM_PATH = ROOT_PATH + OA_SYSTEM

// OA 系统子模块
const OA_TOOLS = 'tools'
const OA_TOOLS_PATH = OA_SYSTEM_PATH + '/' + OA_TOOLS

const USER_INFO = 'user_info'
const USER_INFO_PATH = ROOT_PATH + USER_INFO

const PATHS = {
  /**
   * OA 系统名称, 路径
   */
  OA_SYSTEM,
  OA_SYSTEM_PATH,

  OA_TOOLS,
  OA_TOOLS_PATH,

  /**
   * 用户信息 名称, 路径
   */
  USER_INFO,
  USER_INFO_PATH
}

// 路由配置
const routes = [
  // OA系统 模块
  {
    path: OA_SYSTEM_PATH,
    component: Portal,
    children: [
      // TODO: 暂时全部使用 GroupPage 占位
      {path: 'personal', component: Personal},
      {path: OA_TOOLS, component: Personal},
      {path: 'newEmployee', component: GroupPage},
      {path: 'area', component: GroupPage}
    ]
  },
  // 用户信息 模块
  {
    path: USER_INFO_PATH,
    component: UserInfo
  }
]

const router = new VueRouter({routes})

export {router, PATHS}
