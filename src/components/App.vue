<template style="height: 100%">
  <router-view></router-view>
</template>

<script>
  import Vue from 'vue'
  // 问卷模块
  import Questionnaire from './tools/questionnaire/Questionnaire.vue'
  import QuestionnaireFill from './tools/questionnaire/QuestionnaireFill.vue'
  import QuestionnaireReport from './tools/questionnaire/QuestionnaireReport.vue'
  // 投票模块
  import Voting from './tools/voting/Voting.vue'
  import VotingFill from './tools/voting/VotingFill.vue'
  import VotingReport from './tools/voting/VotingReport.vue'
  // 会议模块
  import Meeting from './tools/meeting/Metting.vue'
  import MeetingDetail from './tools/meeting/MeetingDetail.vue'

  Vue.component(Questionnaire.name, Questionnaire)
  Vue.component(QuestionnaireFill.name, QuestionnaireFill)
  Vue.component(QuestionnaireReport.name, QuestionnaireReport)
  Vue.component(Voting.name, Voting)
  Vue.component(VotingFill.name, VotingFill)
  Vue.component(VotingReport.name, VotingReport)
  Vue.component(Meeting.name, Meeting)
  Vue.component(MeetingDetail.name, MeetingDetail)

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {}
  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #2c3e50;
    margin-top: 0px;
    height: 100%;
    overflow-y: hidden;
  }

</style>
