<template>
  <div style="height: 100%;">
    <!--承载 menu-->
    <el-col :span="4">
      <portal-menu></portal-menu>
    </el-col>
    <!--承载右边内容==>会随着左边菜单改变而改变-->
    <el-col :span="20">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </div>
</template>

<script>
  import PortalMenu from './PortalMenu.vue'

  export default{
    name: '',
    data () {
      return {}
    },
    props: [],
    components: {
      'portal-menu': PortalMenu
    }
  }
</script>

<style>
  .el-col {
    height: 100%;
    background-color: azure;
  }
</style>
