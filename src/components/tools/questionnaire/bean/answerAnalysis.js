/**
 * 用于保存问卷的填写情况
 */

class AnswerBean {
  constructor () {
    // 用于存放选择题答案
    this.dict = {}
    // 用于存放解答题答案
    this.answers = []
  }

  addAnswer (answer) {
    // 将选择题选项添加进来
    for (let index in answer.selections) {
      let selection = answer.selections[index]
      if (this.dict[selection] !== null) {
        this.dict[selection] = 0
      }
      this.dict[selection] += 1
    }
    // 将解答题答案添加进来
    if (answer.answer !== null) {
      this.answers.push(answer.answer)
    }
  }
}

class AnswerAnalysis {

  /**
   * 通过questionnaire初始化
   * @param questionnaire
   */
  constructor (questionnaire) {
    // 问卷数总量
    this.sum = 0
    // 填充对应数量的questionnaireBean
    this.answerBeans = []
    for (let i = 0; i < questionnaire.questions.length; i++) {
      this.answerBeans.push(new AnswerBean())
    }
  }

  addJsonData (jsonData) {
    // 解析问卷中的question对象(从gson字符串中)
    for (let index in jsonData) {
      let questionnaireAnswer = jsonData[index]
      // console.log(JSON.parse(questionnaireAnswer.answer))
      questionnaireAnswer.answer = JSON.parse(questionnaireAnswer.answer)
    }
    // 将每个问卷的数据分析 => 填充到answers中
    jsonData.forEach(questionnaireAnswer => {
      this.addQuestionnaireAnswer(questionnaireAnswer)
    })
    console.log(this.answerBeans)
  }

  addQuestionnaireAnswer (questionnaireAnswer) {
    this.sum += 1
    for (let answerIndex in questionnaireAnswer.answer) {
      let answer = questionnaireAnswer.answer[answerIndex]
      this.answerBeans[answerIndex].addAnswer(answer)
    }
  }
}

export default AnswerAnalysis
