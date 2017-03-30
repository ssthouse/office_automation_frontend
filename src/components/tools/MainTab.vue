<template>
  <el-row>
    <el-col :span="12">
      <questionnaire-card></questionnaire-card>
    </el-col>
    <el-col :span="12">
      <owned-questionnaire-card></owned-questionnaire-card>
    </el-col>
  </el-row>

</template>

<script>
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'
  import OwnedQuestionnaireCard from './questionnaire/OwnedQuestionnaireCard.vue'

  export default{
    name: 'tools-main-tab',
    data () {
      return {}
    },
    props: ['is'],
    components: {
      'questionnaire-card': QuestionnaireCard,
      'owned-questionnaire-card': OwnedQuestionnaireCard
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>

</style>
