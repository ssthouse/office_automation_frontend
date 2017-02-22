<template>
  <div class="main_div">
    <el-tabs type="card"
             class="tabs">
      <!--主标签-->
      <el-tab-pane label="流程审批">
        <el-col :span="12">
          <el-button @click="testAddTab()">添加 tab</el-button>
        </el-col>
      </el-tab-pane>

      <!--动态增减标签-->
      <el-tab-pane closable="true"
                    v-for="tab in tabs"
                    :label="tab.title">
        <div :is="tab.contentIs"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'

  export default{
    name: '',
    data () {
      return {}
    },
    computed: {
      tabs () {
        return this.$store.state.workflowModule.workflow_tabs
      }
    },
    methods: {
      testAddTab () {
        console.error('click add tab')
        this.$store.commit(types.WORKFLOW_ADD_TAB, Questionnaire.name)
      }
    },
    props: [],
    components: {
      'questionnaire': Questionnaire
    }
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
