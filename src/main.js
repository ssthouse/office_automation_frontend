// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
// third party dependences
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'

// import VueQuillEditor from 'vue-quill-editor'
import {router} from './router'
import store from './store'
// 注册一些全局的组件
import UserInfo from './components/home_page/userinfo/UserInfo.vue'

require('!style!css!bootstrap/dist/css/bootstrap.css')
require('!style!css!vue-material/dist/vue-material.css')

Vue.component(UserInfo.name, UserInfo)

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.use(VueMaterial)
// Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
