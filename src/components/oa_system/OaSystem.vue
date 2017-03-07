<template>
  <div style="height: 100%;">
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
  </div>
</template>

<script>
  import OaSystemMenu from './OaSystemMenu.vue'

  export default{
    name: '',
    data () {
      return {
        tabs: [{
          label: 'lable1',
          content: 'content1'
        }, {
          label: 'lable1',
          content: 'content1'
        }]
      }
    },
    props: [],
    components: {
      'oa-system-menu': OaSystemMenu
    }
  }
</script>

<style>
  .el-col {
    height: 100%;
    background-color: white;
  }

  /*.content_tab_pane {*/
    /*height: 100%;*/
  /*}*/
</style>
