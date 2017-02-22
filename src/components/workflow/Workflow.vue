<template>
  <div class="main_div">
    <el-tabs type="card"
             class="tabs">
      <!--主标签-->
      <el-tab-pane label="流程审批">
        <el-col :span="12">
        </el-col>
      </el-tab-pane>

      <!--动态增减标签-->
      <el-tabs-pane closable="true"
                    v-for="tab in tabs"
                    :label="tab.title">

      </el-tabs-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default{
    name: '',
    data () {
      return {}
    },
    computed: {
      tabs () {
        return ''
      }
    },
    props: []
  }
</script>

<style>
  .main_div {
    width: 100%;
    height: 100%;
  }

  .tabs {
    background-color: white;
    width: 100%;
    height: 100%;
  }
</style>
