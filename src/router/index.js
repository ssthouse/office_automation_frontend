// 主模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 门户模块
import Portal from '../components/portal/Portal.vue'
import GroupPage from '../components/portal/pages/GroupPage.vue'
import Personal from '../components/portal/personal/Personal.vue'

// 公文模块
import OfficalDoc from '../components/official_doc/OfficialDoc.vue'
import CompanyNote from '../components/official_doc/pages/CompanyNote.vue'

Vue.use(VueRouter)

// 路由配置
const routes = [
  {// 门户模块
    path: '/portal',
    component: Portal,
    children: [
      // TODO: 暂时全部使用 GroupPage 占位
      {path: 'personal', component: Personal},
      {path: 'group', component: GroupPage},
      {path: 'newEmployee', component: GroupPage},
      {path: 'area', component: GroupPage}]
  },
  {// 公文模块
    path: '/official_doc',
    component: OfficalDoc,
    children: [
      // TODO: 暂时全部使用 GroupPage 占位
      {path: 'one', component: CompanyNote},
      {path: 'two', component: GroupPage},
      {path: 'three', component: GroupPage},
      {path: 'four', component: GroupPage}
    ]
  }
]

const router = new VueRouter({routes})

export default router
