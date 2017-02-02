// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// third party dependences
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 主要模块
import Portal from './portal/Portal.vue'
import GroupPage from './portal/pages/GroupPage.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

// 路由配置
const routes = [{
  path: '/portal',
  component: Portal,
  children: [
    // TODO: 暂时全部使用 GroupPage 占位
    {path: 'group', component: GroupPage},
    {path: 'personal', component: GroupPage},
    {path: 'newEmployee', component: GroupPage},
    {path: 'area', component: GroupPage}]
}]

const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
