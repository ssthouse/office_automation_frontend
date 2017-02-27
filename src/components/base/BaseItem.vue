<template>
  <div class="main_div">
    <el-tabs type="card"
             class="content_tabs">

      <!--主标签: 用于包含卡片 ===> 用于触发其他tab   本tab不可关闭-->
      <el-tab-pane :label="mainTabName">
        <div :is="mainTabIs"></div>
      </el-tab-pane>

      <!--其他动态增加减少的标签-->
      <el-tab-pane v-for="tab in tabs"
                   closable
                   :label="tab.tabLabel">
        <div :is="tab.tabIs"
             class="tab_content"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default{
    name: 'base-item',
    data () {
      return {}
    },
    props: ['mainTabName', 'mainTabIs', 'tabs'],
    components: {}
  }
</script>

<style>
  .main_div {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
</style>
