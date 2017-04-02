import Vue from 'vue'
import mainStore from '../../../../store/modules/main_store'
import {Question} from './question'

/**
 {
   "questionnaireId":10,
   "title":"最后一个问卷",
   "deadline":"date str",
   "createrId":"ssthouse",
   "published":false,
   "questions":[
      {
         "title":"第一题",
         "type":"radio",
         "selections":"安慰人或\nw'e'ga'j娃儿感觉"
      },
      {
         "title":"第二题",
         "type":"radio",
         "selections":"哈哈哈, 这是第二题的选项"
      }
   ]
 }
 */
class Questionnaire {

  /**
   *
   * @param questionnaireData
   */
  constructor (questionnaireData) {
    if (questionnaireData === undefined) {
      return
    }
    Object.assign(this, questionnaireData)
    if (questionnaireData.questions !== null) {
      let questions = []
      questionnaireData.questions.forEach(question => {
        questions.push(new Question(question))
      })
      this.questions = questions
    }
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
      return true
    }
    if (this.deadline.length === 0) {
      return true
    }
    return false
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
    let newQuestion = this.questions[questionIndex].getCopy()
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

  // 保存问卷到服务器
  saveToServer () {
    let questionnaire = this
    questionnaire.deadline = 'date str'
    questionnaire.createrId = mainStore.state.user.username
    return new Promise((resolve, reject) => {
      Vue.http.post('http://127.0.0.1:8080/office_automation_backend/questionnaire/detail', JSON.stringify(questionnaire))
        .then(response => {
          console.log(response)
          if (response.body.ok !== true) {
            reject(response.body.msg)
          } else {
            resolve('save questionnaire successfully')
          }
        }, response => {
          reject('save questionnaire to backend fail')
        })
    })
  }

  publishQuestionnaire () {
    let questionnaire = this
    return new Promise((resolve, reject) => {
      Vue.http.post('http://127.0.0.1:8080/office_automation_backend/questionnaire/detail', JSON.stringify(questionnaire))
        .then(response => {
          if (response.body.ok !== true) {
            reject('发布失败')
          } else {
            resolve('发布成功')
          }
        }, response => {
          reject('发布失败')
        })
    })
  }

  static getEmptyQuestionnaire () {
    let questionnaire = new Questionnaire()
    questionnaire.title = ''
    questionnaire.deadline = ''
    questionnaire.questions = []
    return questionnaire
  }
}

export default Questionnaire
