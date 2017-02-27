<template>
  <div>
    <el-button
      @click="testAddTab()">添加 tab
    </el-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'
  import TabItem from '../base/TabItem'

  export default{
    name: 'workflow-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      testAddTab () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新标签', Questionnaire.name))
      }
    }
  }
</script>

<style>

</style>
