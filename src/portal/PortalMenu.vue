<template>
  <div>
    <el-menu
      :router=true
      default-active="1">
      <el-menu-item :index="urls[0]">集团门户</el-menu-item>
      <el-menu-item :index="urls[1]">个人门户</el-menu-item>
      <el-menu-item :index="urls[2]">新员工门户</el-menu-item>
      <el-menu-item :index="urls[3]">区域门户</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import Portal from './PortalCons'

  export default{
    name: '',
    data () {
      return {
        urls: Portal.PORTAL_URLS
      }
    },
    props: []
  }
</script>

<style>

</style>
