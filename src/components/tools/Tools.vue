<template>
  <base-item :tabs="tabs"
             mainTabName="工具集"
             v-on:remove-tab="handleRemoveTab"
             :mainTabIs="MainTab.name">
  </base-item>
</template>

<script>
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  // 问卷模块
  import Questionnaire from './questionnaire/Questionnaire.vue'
  import QuestionnaireFill from './questionnaire/QuestionnaireFill.vue'
  import AnswerReport from './questionnaire/AnswerReport.vue'
  import * as types from '../../store/mutation-types'
  // 投票模块

  Vue.component(MainTab.name, MainTab)
  Vue.component(Questionnaire.name, Questionnaire)
  Vue.component(QuestionnaireFill.name, QuestionnaireFill)
  Vue.component(AnswerReport.name, AnswerReport)

  export default{
    name: '',
    data () {
      return {
        MainTab
      }
    },
    props: [],
    components: {
      'base-item': BaseItem
    },
    computed: {
      tabs () {
        return this.$store.state.toolsModule.allTabs
      }
    },
    methods: {
      handleRemoveTab (tabIs) {
        this.$store.commit(types.TOOLS_REMOVE_TAB, tabIs)
      }
    }
  }
</script>

<style>

</style>
