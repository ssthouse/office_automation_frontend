<template>
  <div>
    <el-button
      @click="addTab">增加 Tab
    </el-button>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'

  export default{
    name: 'official-doc-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      addTab () {
        this.$store.commit(types.OFFICIAL_DOC_ADD_TAB, new TabItem('测试标签', Questionnaire.name))
      }
    }
  }
</script>

<style>

</style>
