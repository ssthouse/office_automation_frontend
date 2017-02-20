<template style="height: 100%">
  <div style="height: 100%;">
    <el-menu
      :router=true
      default-active="1"
      style="height: 100%">
      <el-menu-item :index="PATHS.OA_TOOLS_PATH">个人首页</el-menu-item>
      <el-menu-item :index="PATHS.USER_INFO_PATH">流程审批</el-menu-item>
      <el-menu-item :index="PATHS.USER_INFO_PATH">信息发布</el-menu-item>
      <el-menu-item :index="PATHS.USER_INFO_PATH">公文处理</el-menu-item>
      <el-menu-item :index="PATHS.OA_TOOLS_PATH">常用工具</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {PATHS} from '../../router/index'

  export default{
    name: '',
    data () {
      return {
        PATHS
      }
    },
    props: []
  }
</script>

<style>

</style>
