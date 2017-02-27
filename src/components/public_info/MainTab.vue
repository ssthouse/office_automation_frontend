<template>
  <div>
    This is the main tab
    <el-button @click="addTab">添加 Tab</el-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'

  export default{
    name: 'public-info-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      addTab () {
        this.$store.commit(types.PUBLIC_INFO_ADD_TAB, new TabItem('TestTab', Questionnaire.name))
      }
    }
  }
</script>

<style>

</style>
