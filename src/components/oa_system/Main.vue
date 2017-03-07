<template style="height: 100%">
  <div id="main">
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

    <el-row>

      <!--承载 menu-->
      <el-col :span="4">
        <oa-system-menu></oa-system-menu>
      </el-col>
      <!--承载右边内容==>会随着左边菜单改变而改变-->
      <el-col :span="20" class="content_tab_pane">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {PATHS} from '../../router/index'
  import OaSystemMenu from './OaSystemMenu.vue'

  export default {
    name: 'main',
    data () {
      return {
        PATHS
      }
    },
    components: {
      'oa-system-menu': OaSystemMenu
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

  #main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #2c3e50;
    margin-top: 0px;
    height: 100%;
  }

</style>
