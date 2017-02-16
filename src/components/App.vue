<template style="height: 100%">
  <div id="app">
    <!--上方顶栏 固定不变的-->
    <el-menu theme="dark"
             :router=true
             style="height: 8%;"
             default-active="/portal"
             mode="horizontal"
             @select="changeMenuItem">
      <!--最左端图标-->
      <el-menu-item index="/">AO 系统</el-menu-item>
      <!--右边导航菜单-->
      <el-menu-item index="/portal">门户</el-menu-item>
      <el-menu-item index="/official_doc">公文</el-menu-item>
      <el-menu-item index="/knowledge">知识</el-menu-item>
      <el-submenu index="other">
        <template slot="title">其他</template>
        <el-menu-item index="other_one">4-1</el-menu-item>
        <el-menu-item index="other_two">4-2</el-menu-item>
        <el-menu-item index="other_three">4-3</el-menu-item>
      </el-submenu>
    </el-menu>

    <!--下方占据92空间-->
    <el-col :span="24" style="height: 92%">
      <!--路由匹配的控件将会被填充在这-->
      <!--整个下部都被填充上-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </div>
</template>

<script>
  import Hello from './Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    methods: {
      connectServer: function () {
        this.$http.get('http://127.0.0.1:8081/user/ssthouse').then(response => {
          let userinfo = response.body
          console.log(userinfo.username)
          console.log(userinfo.age)
        })
      },
      changeMenuItem: function (key, keyPath) {
        console.log(key + ' ' + keyPath)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #2c3e50;
    margin-top: 0px;
    height: 100%;
    overflow-y: hidden;
  }
</style>
