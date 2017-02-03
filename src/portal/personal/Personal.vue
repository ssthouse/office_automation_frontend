<template>
  <div>
    <el-col :span="12">
      <questionnaire></questionnaire>
    </el-col>
  </div>
</template>

<script>
  import Questionnaire from './Questionnaire.vue'

  export default{
    name: '',
    data () {
      return {}
    },
    props: [],
    components: {
      'questionnaire': Questionnaire
    }
  }
</script>

<style>

</style>
