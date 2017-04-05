<template>
  <div>
    this is the main page for home page.
    <el-button @click="addTab()">add tab</el-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'

  export default{
    name: 'homepage-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      addTab () {
        this.$store.commit(types.HOMEPAGE_ADD_TAB, new TabItem('新建问卷调查', Questionnaire.name, ''))
      }
    }
  }
</script>

<style>

</style>
