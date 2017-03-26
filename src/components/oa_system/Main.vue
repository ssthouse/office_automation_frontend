<template>
  <div id="main">
    <!--上方顶栏 固定不变的-->
    <el-row style="margin-top: 0px; margin-bottom: 0px; height: 8%">
      <el-col :span="20">
        <el-menu theme="dark"
                 :router=true
                 style="margin-left: 0px; margin-top: 0px;"
                 default-active="/portal"
                 mode="horizontal"
                 @select="changeMenuItem">
          <el-menu-item :index=PATHS.OA_SYSTEM_INDEX><i class="el-icon-menu"></i>OA 系统</el-menu-item>
          <!--右边导航菜单-->
          <el-menu-item :index=PATHS.USER_INFO_PATH><i class="el-icon-setting"></i>个人信息</el-menu-item>
        </el-menu>
      </el-col>

      <!--右上角用户名-->
      <el-col :span="4">
        <div @click="clickUserInfo()">
          <img id="avatar" src="../../assets/logo.png"/>
          <p id="textUsername">{{username}}</p>
        </div>
      </el-col>
    </el-row>

    <el-row id="oa_system_panel">
      <!--承载 menu-->
      <el-col :span="4" style="height: 100%;">
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
  import * as MUTATION_TYPES from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import UserInfo from '../home_page/UserInfo.vue'

  export default {
    name: 'main',
    data () {
      return {
        PATHS,
        MUTATION_TYPES,
        userInfoVisible: 'hidden',
        oaSystemVisible: 'hidden'
      }
    },
    components: {
      'oa-system-menu': OaSystemMenu
    },
    methods: {
      connectServer: function () {
        this.$http.get('http://127.0.0.1:8080/office_automation_backend/user/ssthouse').then(response => {
          let userinfo = response.body
          console.log(userinfo.username)
          console.log(userinfo.age)
        }, resonse => {
          this.$message('something is wrong!')
        })
      },
      changeMenuItem: function (key, keyPath) {
        console.log(key + ' ' + keyPath)
      },
      /**
       * 用户信息点击事件
       */
      clickUserInfo: function () {
        this.$store.commit(MUTATION_TYPES.HOMEPAGE_ADD_TAB, new TabItem('个人信息', UserInfo.name))
      }
    },
    computed: {
      username () {
        return this.$store.state.mainModule.user.name
      }
    },
    created: function () {
      // 从后台获取用户数据
      this.$store.dispatch(this.MUTATION_TYPES.ACTION_GET_USERINFO).then((success) => {
        console.log('成功获取用户数据')
      }, errorMsg => {
        this.$message(errorMsg)
        console.log('获取用户数据失败')
      })
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
    margin-top: 0;
    height: 100%;
  }

  /*用于显示 scroll bar */
  .content_tab_pane {
    height: 100%;
    overflow-y: scroll;
    margin: 0 auto;
  }

  #avatar {
    background-color: #2c3e50;
    height: 45px;
    margin-top: 10px;
    border-radius: 50%;
  }

  #textUsername {
    float: right;
    margin-right: 10px;
    color: white;
  }

  #oa_system_panel {
    height: 92%;
    overflow-y: hidden;
    margin-top: 8px;
    margin-bottom: 0px;
    background-color: white;
  }
</style>
