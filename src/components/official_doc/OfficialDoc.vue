<!--公文处理主模块-->
<template>
  <div>
    <!--左侧菜单-->
    <el-col :span="6">
      <menu-item></menu-item>
    </el-col>
    <!--主面板-->
    <el-col :span="18">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
  import Menu from './OfficialDocMenu.vue'

  export default{
    name: 'official-doc',
    data () {
      return {}
    },
    props: [],
    components: {
      'menu-item': Menu
    }
  }
</script>

<style>

</style>
