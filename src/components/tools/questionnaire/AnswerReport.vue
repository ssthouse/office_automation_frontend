<template>
  <div>
    <h3>问卷名称: {{questionnaire.title}}</h3>
    <hr/>

    <!--问卷总体数据-->
    <el-card class="box-card">
      <div slot="header">
        <span>问卷数据</span>
      </div>
      <div class="card-content">
        <h4>问卷填写数量: {{answerAnalysis.sum}} 份</h4>
        <h4>截止日期: {{questionnaire.deadline}}</h4>
        <h4>问卷管理者: {{questionnaire.createrId}}</h4>
      </div>
    </el-card>

    <el-card class="box-card">
      <h4 style="margin-bottom: -10px; margin-top: 0px;">问卷统计数据</h4>
    </el-card>

    <!--每道题详细数据-->
    <el-card class="box-card" v-for="question in questionnaire.questions">
      <!--当前题目的标题-->
      <h5 style="margin-left: 10px; float: left; margin-top: -5px;">
        题目{{questionnaire.questions.indexOf(question) + 1}}:
        {{questionnaire.questions[questionnaire.questions.indexOf(question)].title}}</h5>

      <!--如果是选择题, 画一幅扇形图-->
      <div v-if="question.type === QUESTION_TYPES.RADIO || question.type === QUESTION_TYPES.CHECK_BOX"
           style="margin-top: 20px">
        {{answerBeanList[questionnaire.questions.indexOf(question)].answers}}
      </div>

      <!--如果是文字题, 给一个下拉面板-->
      <el-collapse v-model="name"
                   style="margin-top: 20px; text-align: left">
        <el-collapse-item title="所有回答:"
                          name="1"
                          style="text-align: left"
                          v-if="question.type === QUESTION_TYPES.TEXT_AREA">
          <div v-for="answer in answerBeanList[questionnaire.questions.indexOf(question)].answers">
            {{answer}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
  /**
   * 传入数据为: data: questionnaire
   */
  import AnswerAnalysis from './bean/answerAnalysis'
  import {QUESTION_TYPES} from './bean/question'
  const URL_GET_ANSWER_ANALYSIS = 'http://127.0.0.1:8080/office_automation_backend/questionnaire/answer_analysis'

  export default{
    name: 'answer-report',
    data () {
      return {
        questionnaire: this.data,
        answerAnalysis: new AnswerAnalysis(this.data),
        QUESTION_TYPES,
        name: '1'
      }
    },
    props: ['data'],
    computed: {
      answerBeanList () {
        return this.answerAnalysis.answerBeans
      }
    },
    methods: {
      getAnswerBean (question) {
        let index = this.questionnaire.questions.indexOf(question)
        return this.answerAnalysis.answerBeans[index]
      }
    },
    created: function () {
      console.log(this.questionnaire)
      this.$http.get(URL_GET_ANSWER_ANALYSIS, {params: {questionnaireId: this.data.questionnaireId}})
        .then(response => {
          this.answerAnalysis = new AnswerAnalysis(this.data)
          this.answerAnalysis.addJsonData(response.body)
        }, response => {
          console.log(response)
        })
    }
  }
</script>

<style>
  .card-content {
    margin-top: -20px;
    margin-bottom: -20px;
  }
</style>
