<template>
  <div>
    <h3>问卷名称: {{questionnaire.title}}</h3>
    <hr/>

    <canvas id="myChart" ref="myChart"
            style="width: 400px; height: 400px; margin-left: 20px"></canvas>

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
      <el-collapse v-model="nameModel[questionnaire.questions.indexOf(question)]"
                   style="margin-top: 20px; text-align: left">
        <el-collapse-item title="所有回答:"
                          name="questionnaire.questions.indexOf(question)"
                          style="text-align: left"
                          v-if="question.type === QUESTION_TYPES.TEXT_AREA">
          <div v-for="answer in answerBeanList[questionnaire.questions.indexOf(question)].answers">
            {{answer}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <e-button @click="showChart()">
      点我显示Chart
    </e-button>
  </div>
</template>

<script>
  /**
   * 传入数据为: data: questionnaire
   */
  import Chart from 'chart.js'
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
        name: '1',
        nameModel: []
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
      },
      showChart () {
        let ctx = this.$refs.myChart
        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
        console.log(myChart)
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
