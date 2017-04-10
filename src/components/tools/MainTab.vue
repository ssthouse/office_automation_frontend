<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="12"
              class="card-col">
        <questionnaire-card></questionnaire-card>
      </el-col>
      <el-col :span="12"
              class="card-col">
        <owned-questionnaire-card></owned-questionnaire-card>
      </el-col>
      <el-col :span="12"
              class="card-col">
        <voting-card></voting-card>
      </el-col>
      <el-col :span="12"
              class="card-col">
        <owned-voting-card></owned-voting-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 问卷模块
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'
  import OwnedQuestionnaireCard from './questionnaire/OwnedQuestionnaireCard.vue'
  // 投票模块
  import VotingCard from './voting/VotingCard.vue'
  import OwnedVotingCard from './voting/OwnedVotingCard.vue'

  export default{
    name: 'tools-main-tab',
    data () {
      return {}
    },
    props: ['is'],
    components: {
      'questionnaire-card': QuestionnaireCard,
      'owned-questionnaire-card': OwnedQuestionnaireCard,
      'voting-card': VotingCard,
      'owned-voting-card': OwnedVotingCard
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>
  .card-col {
    margin-top: 20px;
  }
</style>
