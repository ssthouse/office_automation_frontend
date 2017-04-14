<template>
  <div class="main_div">
    <el-tabs type="card"
             :activeName="tabIndex"
             @tab-remove="handleTabRemove">

      <!--主标签: 用于包含卡片 ===> 用于触发其他tab   本tab不可关闭-->
      <el-tab-pane :label="mainTabName"
                   name="0">
        <div>
          <div :is="mainTabIs"></div>
        </div>
      </el-tab-pane>

      <!--其他动态增加减少的标签-->
      <el-tab-pane v-for="tab in tabs"
                   closable
                   :name="(tabs.indexOf(tab) + 1).toString()"
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
    props: ['mainTabName', 'mainTabIs', 'tabs', 'activeTabIndex'],
    computed: {
      tabIndex () {
        return this.activeTabIndex.toString()
      }
    },
    components: {},
    methods: {
      handleTabRemove (tab) {
          // emit the name(index) of the tab
        this.$emit('remove-tab', tab.name)
      }
    }
  }
</script>

<style>
  .main_div {
    width: 100%;
    height: 100%;
  }
</style>
