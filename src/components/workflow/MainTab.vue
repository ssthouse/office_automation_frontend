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

  export default{
    name: 'main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      testAddTab () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, Questionnaire.name)
      }
    }
  }
</script>

<style>

</style>
