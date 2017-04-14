<template>
  <base-item :tabs="tabs"
             mainTabName="工具集"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"
             :mainTabIs="MainTab.name">
  </base-item>
</template>

<script>
  import BaseItem from '../base/BaseItem.vue'
  import * as types from '../../store/mutation-types'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  // 问卷模块
  import Questionnaire from './questionnaire/Questionnaire.vue'
  import QuestionnaireFill from './questionnaire/QuestionnaireFill.vue'
  import QuestionnaireReport from './questionnaire/QuestionnaireReport.vue'
  // 投票模块
  import Voting from './voting/Voting.vue'
  import VotingFill from './voting/VotingFill.vue'
  import VotingReport from './voting/VotingReport.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(Questionnaire.name, Questionnaire)
  Vue.component(QuestionnaireFill.name, QuestionnaireFill)
  Vue.component(QuestionnaireReport.name, QuestionnaireReport)
  Vue.component(Voting.name, Voting)
  Vue.component(VotingFill.name, VotingFill)
  Vue.component(VotingReport.name, VotingReport)

  export default{
    name: 'tools',
    data () {
      return {
        MainTab,
        activeTabIndex: '0'
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
