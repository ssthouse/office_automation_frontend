<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="8"
              class="card-col"
              v-for="cardIs in cardList">
        <div v-bind:is="cardIs"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Cons from '../base/Constant'
  import * as EventBus from '../base/EventBus'
  // 问卷模块
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'
  import OwnedQuestionnaireCard from './questionnaire/OwnedQuestionnaireCard.vue'
  // 投票模块
  import VotingCard from './voting/VotingCard.vue'
  import OwnedVotingCard from './voting/OwnedVotingCard.vue'
  // 会议模块
  import MeetingCard from './meeting/MeetingCard.vue'
  import OwnedMettingCard from './meeting/OwnedMeetingCard.vue'
  // Vue
  import Vue from 'vue'

  Vue.component(QuestionnaireCard.name, QuestionnaireCard)
  Vue.component(OwnedQuestionnaireCard.name, OwnedQuestionnaireCard)
  Vue.component(VotingCard.name, VotingCard)
  Vue.component(OwnedVotingCard.name, OwnedVotingCard)
  Vue.component(MeetingCard.name, MeetingCard)
  Vue.component(OwnedMettingCard.name, OwnedMettingCard)

  export default{
    name: 'tools-main-tab',
    data () {
      return {
        cardList: [QuestionnaireCard.name, VotingCard.name, MeetingCard.name,
          OwnedQuestionnaireCard.name, OwnedVotingCard.name, OwnedMettingCard.name],
        componentDic: Cons.ComponentMap,
        Cons: Cons
      }
    },
    props: ['is'],
    components: {},
    computed: {},
    methods: {
      getConfig () {
        // update config from store
        this.toolsPageConfig = this.$store.getters.getToolsPageConfig
      }
    },
    created: function () {
      // init config
      this.getConfig()
      // register config change event
      EventBus.instance.$on(EventBus.EVENT_MAIN_UPDATE_USER_CONFIG, () => {
        this.getConfig()
      })
    }
  }
</script>

<style>
  .card-col {
    margin-top: 20px;
  }
</style>
