<template style="height: 100%">
  <div style="height: 100%;">
    <el-menu
      :router=true
      default-active="1"
      style="height: 100%">
      <el-menu-item :index="PATHS.HOME_PAGE_PATH">
        <md-icon class="menu_icon">account_circle</md-icon>
        <span>个人首页</span>
      </el-menu-item>
      <el-menu-item :index="PATHS.WORKFLOW_PATH">
        <md-icon class="menu_icon">assignment</md-icon>
        <span>审批管理</span>
      </el-menu-item>
      <el-menu-item :index="PATHS.OFFICIAL_DOC_PATH">
        <md-icon class="menu_icon">description</md-icon>
        <span>公文处理</span>
      </el-menu-item>
      <el-menu-item :index="PATHS.OA_TOOLS_PATH">
        <md-icon class="menu_icon">build</md-icon>
        <span>常用工具</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { PATHS } from '../../router/index'
  import * as EventBus from '../base/EventBus'

  export default{
    name: '',
    data () {
      return {
        PATHS
      }
    },
    props: [],
    created: function () {
      EventBus.instance.$on(EventBus.EVENT_TO_TOOLS, () => {
        this.$router.push({path: PATHS.OA_TOOLS_PATH})
      })
    }
  }
</script>

<style>
  .menu_icon {
    margin-top: -3px;
    margin-right: 4px;
  }
</style>
