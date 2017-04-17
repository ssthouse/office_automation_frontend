<template>
  <base-item :tabs="tabs"
             mainTabName="工具集"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"
             :mainTabIs="MainTab.name">
  </base-item>
</template>

<script>
  import * as EventBus from '../base/EventBus'
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
  // 会议模块
  import Meeting from './meeting/Metting.vue'
  import MeetingDetail from './meeting/MeetingDetail.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(Questionnaire.name, Questionnaire)
  Vue.component(QuestionnaireFill.name, QuestionnaireFill)
  Vue.component(QuestionnaireReport.name, QuestionnaireReport)
  Vue.component(Voting.name, Voting)
  Vue.component(VotingFill.name, VotingFill)
  Vue.component(VotingReport.name, VotingReport)
  Vue.component(Meeting.name, Meeting)
  Vue.component(MeetingDetail.name, MeetingDetail)

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
      /**
       * handle base item remove tab event
       * @param tabName number str
       */
      handleRemoveTab (tabName) {
        let index = parseInt(tabName)
        let tabIs = this.tabs[index - 1].tabIs
        this.$store.commit(types.TOOLS_REMOVE_TAB, tabIs)
      }
    },
    created: function () {
      EventBus.instance.$on(EventBus.EVENT_TOOLS_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    }
  }
</script>

<style>

</style>
