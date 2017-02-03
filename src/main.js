// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// third party dependences
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 门户模块
import Portal from './portal/Portal.vue'
import GroupPage from './portal/pages/GroupPage.vue'
import Personal from './portal/personal/Personal.vue'
import VueQuillEditor from 'vue-quill-editor'

// 公文模块
import OfficalDoc from './official_doc/OfficialDoc.vue'
import CompanyNote from './official_doc/pages/CompanyNote.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueQuillEditor)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
