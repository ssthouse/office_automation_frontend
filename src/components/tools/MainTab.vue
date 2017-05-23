<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="12"
              class="card-col"
              v-for="cardIs in cardList">
        <div v-bind:is="cardIs"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Cons from '../base/Constant'
  // 问卷模块
  import OwnedQuestionnaireCard from './questionnaire/OwnedQuestionnaireCard.vue'
  // 投票模块
  import OwnedVotingCard from './voting/OwnedVotingCard.vue'
  // 会议模块
  import OwnedMettingCard from './meeting/OwnedMeetingCard.vue'
  // Vue
  import Vue from 'vue'

  Vue.component(OwnedQuestionnaireCard.name, OwnedQuestionnaireCard)
  Vue.component(OwnedVotingCard.name, OwnedVotingCard)
  Vue.component(OwnedMettingCard.name, OwnedMettingCard)

  export default{
    name: 'tools-main-tab',
    data () {
      return {
        cardList: [OwnedQuestionnaireCard.name, OwnedVotingCard.name, OwnedMettingCard.name],
        componentDic: Cons.ComponentMap,
        Cons: Cons
      }
    },
    props: ['is'],
    components: {},
    computed: {},
    methods: {},
    created: function () {}
  }
</script>

<style>
  .card-col {
    margin-top: 20px;
  }
</style>
