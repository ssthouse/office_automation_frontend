<template>
  <el-col :span="12">
    <questionnaire-card></questionnaire-card>
  </el-col>
</template>

<script>
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'

  export default{
    name: 'tools-main-tab',
    data () {
      return {}
    },
    props: [],
    components: {
      'questionnaire-card': QuestionnaireCard
    },
    computed: {}
  }
</script>

<style>

</style>
