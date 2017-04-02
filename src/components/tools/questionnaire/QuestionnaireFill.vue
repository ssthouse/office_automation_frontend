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
           v-if="question.type === QUESTION_TYPES.RADIO"
           style="text-align: left; padding-left: 20px">
        <el-radio
          v-model="answers[questionnaire.questions.indexOf(question)].selections[0]"
          :label="selection">{{selection}}
        </el-radio>

      </div>

      <el-checkbox-group
        style="text-align: left; padding-left: 20px"
        v-for="selection in question.selections.split('\n')"
        v-model="answers[questionnaire.questions.indexOf(question)].selections"
        v-if="question.type === QUESTION_TYPES.CHECK_BOX">
        <el-checkbox
          :label="selection">{{selection}}
        </el-checkbox>

      </el-checkbox-group>

      <!--文字输入-->
      <el-input type="textArea" autosize placeholder="请输入内容"
                v-model="answers[questionnaire.questions.indexOf(question)].answer"
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
  import {QUESTION_TYPES} from './bean/question'
  import Answer from './bean/answer'

  const URL_POST_QUESTIONNAIRE_ANSWER = 'http://127.0.0.1:8080/office_automation_backend/questionnaire/answer'

  export default{
    name: 'questionnaire-fill',
    data () {
      return {
        questionnaire: this.data,
        QUESTION_TYPES,
        answers: []
      }
    },
    props: ['data'],
    created: function () {
      console.log(JSON.stringify(this.data))
      for (let i = 0; i < this.questionnaire.questions.length; i++) {
        let type = this.questionnaire.questions[i].type
        this.answers.push(Answer.getAnswer(i, type))
      }
      console.log(JSON.stringify(this.answers))
    },
    computed: {},
    methods: {
      /**
       * 提交的数据格式为:
       * {
       *  questionnaire_id: 10,
       *  answers: []
       * }
       */
      submit () {
        console.log('submit')
        console.log(JSON.stringify(this.answers))
        let postBean = {
          questionnaireId: this.questionnaire.questionnaireId,
          'answers': this.answers
        }
        console.log(JSON.stringify(postBean))
        this.$http.post(URL_POST_QUESTIONNAIRE_ANSWER, JSON.stringify(postBean))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message(response.body.msg)
            }
            this.$message('问卷提交成功')
          }, response => {
            this.$message('问卷提交失败')
          })
      }
    }
  }
</script>

<style>

</style>
