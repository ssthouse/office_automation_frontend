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
        <canvas :ref="questionnaire.questions.indexOf(question).toString() + 'chart'"
                :id="questionnaire.questions.indexOf(question).toString() + 'chart'"
                style="width: 300px; height: 300px;"></canvas>
      </div>

      <!--如果是文字题, 给一个下拉面板-->
      <el-collapse v-model="nameModel[questionnaire.questions.indexOf(question)]"
                   v-if="question.type === QUESTION_TYPES.TEXT_AREA"
                   style="margin-top: 20px; text-align: left">
        <el-collapse-item title="所有回答:"
                          name="questionnaire.questions.indexOf(question)"
                          style="text-align: left">
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
      // 填充所有选择题的数据到表格中
      showChart () {
        let component = this
        this.answerAnalysis.answerBeans.forEach(answerBean => {
          // 如果是问答题 就不管
          let questionIndex = this.answerAnalysis.answerBeans.indexOf(answerBean)
          if (this.questionnaire.questions[questionIndex].type === QUESTION_TYPES.TEXT_AREA) {
            return
          }
          // 创建用于chart使用的数据
          let labels = []
          let data = []
          // 填充dict中空余项
          for (let option in answerBean.dict) {
            labels.push(option)
            data.push(answerBean.dict[option])
          }
          console.log('this is the data')
          console.log(data)
          console.log(labels)
          let name = component.answerAnalysis.answerBeans.indexOf(answerBean).toString() + 'chart'
          let ctx = component.$refs[name]
          let chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: '选项分布',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
              }]
            },
            options: {
              responsive: true,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          })
          console.log(chart)
        })
      }
    },
    created: function () {
      console.log(this.questionnaire)
      this.$http.get(URL_GET_ANSWER_ANALYSIS, {params: {questionnaireId: this.data.questionnaireId}})
        .then(response => {
          this.answerAnalysis = new AnswerAnalysis(this.data)
          this.answerAnalysis.addJsonData(response.body)
          this.showChart()
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
