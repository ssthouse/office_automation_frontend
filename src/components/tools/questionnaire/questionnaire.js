import Vue from 'vue'

class Questionnaire {

  /**
   * 构造方法
   * @param title 问卷标题
   * @param questions 问卷的所有问题
   * @param deadline 问卷的截止日期
   */
  constructor (title, questions, deadline) {
    this.title = title
    this.questions = questions
    this.deadline = deadline
  }

  /**
   * 判空
   * @returns {boolean}
   */
  isEmpty () {
    if (this.title.length === 0) {
      return true
    }
    if (this.questions.length === 0) {
      return false
    }
    if (this.deadline.length === 0) {
      return false
    }
  }

  /**
   * 添加问题到问卷
   * @param question
   */
  addQuestion (question) {
    this.questions.push(question)
  }

  /*
   对题目的四种操作
   */

  duplicateQuestion (questionIndex) {
    var newQuestion = this.questions[questionIndex].getCopy()
    this.questions.splice(questionIndex + 1, 0, newQuestion)
  }

  deleteQuestion (questionIndex) {
    this.questions.splice(questionIndex, 1)
  }

  upQuestion (questionIndex) {
    let currentQuestion = this.questions.splice(questionIndex, 1)[0]
    if (questionIndex === 0) {
      this.questions.push(currentQuestion)
    } else {
      let newIndex = questionIndex - 1
      this.questions.splice(newIndex, 0, currentQuestion)
    }
  }

  downQuestion (questionIndex) {
    let currentQuestion = this.questions.splice(questionIndex, 1)[0]
    console.log(currentQuestion)
    let newIndex = questionIndex + 1
    if (questionIndex === this.questions.length) {
      newIndex = 0
    }
    this.questions.splice(newIndex, 0, currentQuestion)
  }

// TODO 保存问卷到服务器
  saveToServer () {
    let questionnaire = this
    console.log(questionnaire)
    questionnaire.deadline = 'date str'
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(questionnaire))
      Vue.http.post('http://127.0.0.1:8080/office_automation_backend/questionnaire/detail', null)
        .then(response => {
          if (response.ok !== true) {
            reject(response.body)
          } else {
            resolve('save questionnaire successfully')
          }
        }, response => {
          reject('save questionnaire to backend fail')
        })
    })
  }

// TODO 发布问卷,
  publishQuestionnaire () {

  }
}

export default Questionnaire
