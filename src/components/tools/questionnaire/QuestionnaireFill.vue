<template>
  <div>
    <p>请填写以下问卷</p>
    <hr/>
    <!--标题-->
    <h2>{{questionnaire.title}}</h2>

    <!--所有题目-->
    <el-card class="box-card" v-for="question in questionnaire.questions">
      <!--题目标题-->
      <p style="align: left; text-align: left; padding-left: 10px">
        <span>{{questionnaire.questions.indexOf(question) + 1}}.{{question.title}}</span>
      </p>
      <!--单选和多选-->
      <div v-for="selection in question.selections.split('\n')"
           v-if="question.type === QUESTION_TYPES.RADIO || question.type === QUESTION_TYPES.CHECK_BOX"
           style="text-align: left; padding-left: 20px">
        <input
          :type="question.type"
          style="padding-left: 10px"
          v-text="selection">{{selection}}</input>
      </div>
      <!--文字输入-->
      <el-input type="textarea" autosize placeholder="请输入内容"
                v-if="question.type === QUESTION_TYPES.TEXT_AREA"></el-input>
    </el-card>

    <el-button @click="submit()"
               style="margin-top: 20px"
               type="primary">
      提交问卷
    </el-button>
  </div>
</template>

<script>
  import {QUESTION_TYPES} from './question'

  export default{
    name: 'questionnaire-fill',
    data () {
      return {
        questionnaire: this.data,
        QUESTION_TYPES
      }
    },
    props: ['data'],
    created: function () {
    },
    computed: {},
    methods: {
      submit () {
        console.log('submit')
      }
    }
  }
</script>

<style>

</style>
