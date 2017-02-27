<template style="height: 100%">
  <div id="app">
    <!--上方顶栏 固定不变的-->
    <el-menu theme="dark"
             :router=true
             style="height: 8%;"
             default-active="/portal"
             mode="horizontal"
             @select="changeMenuItem">
      <el-input placeholder="请输入关键字"
                class="input_key_word"
                style="width: 150px"></el-input>
      <!--最左端图标-->
      <el-menu-item :index=PATHS.OA_SYSTEM_INDEX><i class="el-icon-menu"></i>OA 系统</el-menu-item>
      <!--右边导航菜单-->
      <el-menu-item :index=PATHS.USER_INFO_PATH><i class="el-icon-setting"></i>个人信息</el-menu-item>
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
  import {PATHS} from '../router/index'

  export default {
    name: 'app',
    data () {
      return {
        PATHS
      }
    },
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
