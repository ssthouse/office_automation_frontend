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
  import QuestionnaireBean from '../tools/questionnaire/bean/questionnaire'

  export default{
    name: 'official-doc-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      addTab () {
        this.$store.commit(types.OFFICIAL_DOC_ADD_TAB, new TabItem('测试标签', 'questionnaire', QuestionnaireBean.getEmptyQuestionnaire()))
      }
    }
  }
</script>

<style>

</style>
