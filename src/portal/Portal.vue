<template>
  <div>
    <!--承载 menu-->
    <el-col :span="6">
      <portal-menu></portal-menu>
    </el-col>
    <!--承载右边内容==>会随着左边菜单改变而改变-->
    <el-col :span="18">
      <router-view></router-view>
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

</style>
