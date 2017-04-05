<template>
  <div class="main_div">
    <el-tabs type="card"
             @tab-remove="handleTabRemove"
             class="content_tabs">

      <!--主标签: 用于包含卡片 ===> 用于触发其他tab   本tab不可关闭-->
      <el-tab-pane :label="mainTabName">
        <div :is="mainTabIs"></div>
      </el-tab-pane>

      <!--其他动态增加减少的标签-->
      <el-tab-pane v-for="tab in tabs"
                   closable
                   :name="tab.tabIs"
                   :label="tab.tabLabel">
        <div v-bind:is="tab.tabIs"
             :data="tab.data"
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
    components: {},
    methods: {
      handleTabRemove (tabIs) {
        this.$emit('remove-tab', tabIs.name)
      }
    }
  }
</script>

<style>
  .main_div {
    width: 100%;
  }
</style>
