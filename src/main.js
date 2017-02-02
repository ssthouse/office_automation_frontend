// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// third party dependences
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path: '/main/:id',
  component: App,
  children: [
    {path: 'item_one', component: App},
    {path: 'item_two', component: App}]
}]

const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
