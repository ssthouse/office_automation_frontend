// 主模块
import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录模块
import Login from '../components/login/Login.vue'

// OA 系统模块
import Main from '../components/oa_system/Main.vue'
import HomePage from '../components/home_page/HomePage.vue'
import Workflow from '../components/workflow/Workflow.vue'
import PublicInfo from '../components/public_info/PublicInfo.vue'
import OfficlalDoc from '../components/official_doc/OfficialDoc.vue'
import Tools from '../components/tools/Tools.vue'

// 初始化总路由
Vue.use(VueRouter)

const ROOT_PATH = '/'
const OA_SYSTEM = 'oa_system'
const OA_SYSTEM_PATH = ROOT_PATH + OA_SYSTEM

// 登录模块
const LOGIN_PATH = '/login'

// OA 系统模块
const OA_TOOLS = 'tools'
const OA_TOOLS_PATH = OA_SYSTEM_PATH + '/' + OA_TOOLS

const HOME_PAGE = 'home_page'
const HOME_PAGE_PATH = OA_SYSTEM_PATH + '/' + HOME_PAGE

const WORKFLOW = 'workflow'
const WORKFLOW_PATH = OA_SYSTEM_PATH + '/' + WORKFLOW

const PUBLIC_INFO = 'public_info'
const PUBLIC_INFO_PATH = OA_SYSTEM_PATH + '/' + PUBLIC_INFO

const OFFICIAL_DOC = 'official_doc'
const OFFICIAL_DOC_PATH = OA_SYSTEM_PATH + '/' + OFFICIAL_DOC

// 最外层路由
const PATHS = {
  /**
   * 登录模块
   */
  LOGIN_PATH,

  /**
   * OA 系统名称, 路径
   */
  OA_SYSTEM,
  OA_SYSTEM_INDEX: HOME_PAGE_PATH,

  // 个人首页
  HOME_PAGE,
  HOME_PAGE_PATH,

  // 流程审批
  WORKFLOW,
  WORKFLOW_PATH,

  // 信息发布
  PUBLIC_INFO,
  PUBLIC_INFO_PATH,

  // 公文处理
  OFFICIAL_DOC,
  OFFICIAL_DOC_PATH,

  // 常用工具
  OA_TOOLS,
  OA_TOOLS_PATH
}

// 路由配置
const routes = [
  // 登录模块
  {
    path: LOGIN_PATH,
    component: Login
  },
  {
    path: '/',
    redirect: LOGIN_PATH
  },
  // OA系统 模块
  {
    path: OA_SYSTEM_PATH,
    component: Main,
    children: [
      {path: '/', component: HomePage},
      {path: HOME_PAGE, component: HomePage},
      {path: WORKFLOW, component: Workflow},
      {path: PUBLIC_INFO, component: PublicInfo},
      {path: OFFICIAL_DOC, component: OfficlalDoc},
      {path: OA_TOOLS, component: Tools}
    ]
  }
]

const router = new VueRouter({routes})

export {router, PATHS}
