<template>
  <div id="main">
    <!--上方顶栏 固定不变的-->
    <el-row style="margin-top: 0px; margin-bottom: 0px; height: 8%">
      <el-col :span="20">
        <el-menu theme="dark"
                 style="margin-left: 10px; margin-top: 0px;"
                 default-active="/portal"
                 mode="horizontal"
                 @select="changeMenuItem">
          <el-menu-item :index=paths.OA_SYSTEM_INDEX style="font-size: 20px">
            <!--<img src="../../assets/logo.png"-->
            <!--style="width: 30px; height: 30px;"/>-->
            <md-icon class="menu_icon" style="margin-top: -6px;">home</md-icon>
            <span>OA管理系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <!--右上角用户名-->
      <el-col :span="4">
        <div @click="clickUserInfo()" style="text-align: center;">
          <img id="avatar" src="../../assets/logo.png"/>
          <span id="textUsername"
                style="">{{username}}</span>
        </div>
      </el-col>
    </el-row>

    <el-row id="oa_system_panel">
      <!--承载 menu-->
      <el-col :span="3" style="height: 100%;">
        <oa-system-menu></oa-system-menu>
      </el-col>
      <!--承载右边内容==>会随着左边菜单改变而改变-->
      <el-col :span="21" class="content_tab_pane">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { PATHS } from '../../router/index'
  import OaSystemMenu from './OaSystemMenu.vue'
  import * as MUTATION_TYPES from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import UserInfo from '../home_page/userinfo/UserInfo.vue'

  export default {
    name: 'main',
    data () {
      return {
        paths: PATHS,
        MUTATION_TYPES,
        userInfoVisible: 'hidden',
        oaSystemVisible: 'hidden'
      }
    },
    components: {
      'oa-system-menu': OaSystemMenu
    },
    methods: {
      changeMenuItem: function (key, keyPath) {
        // console.log(key + ' ' + keyPath)
      },
      /**
       * 用户信息点击事件
       */
      clickUserInfo: function () {
        this.$store.commit(MUTATION_TYPES.HOMEPAGE_ADD_TAB, new TabItem('个人信息', UserInfo.name, ''))
      },
      onClick: function () {
        this.$message('final')
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
        // console.log('获取用户数据失败')
      })
      // 获取用户配置信息
      this.$store.dispatch(this.MUTATION_TYPES.ACTION_GET_USER_CONFIG).then(success => {
        // console.log(('获取用户配置信息成功'))
      }, errorMsg => {
        console.log('获取用户配置信息失败')
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
    color: white;
    vertical-align: middle;
    height: 100%;
    margin: 0 5px 0 5px;
  }

  #oa_system_panel {
    height: 92%;
    overflow-y: hidden;
    margin-top: 8px;
    margin-bottom: 0px;
    background-color: white;
  }
</style>
