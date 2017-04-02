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
    console.log(questionnaire)
    // 问卷数总量
    this.sum = 0
    // 填充对应数量的questionnaireBean
    this.answerBeans = []
    questionnaire.questions.forEach(question => {
      let answerBean = new AnswerBean()
      if (question.type !== 'textArea') {
        console.log('selection:')
        console.log(question.selections)
        let selection = question.selections.split('\n')
        console.log(selection)
        for (let index in selection) {
          answerBean.dict[selection[index]] = 0
        }
      }
      this.answerBeans.push(answerBean)
    })
    // for (let i = 0; i < questionnaire.questions.length; i++) {
    //   // 初始化每一个选项的默认值
    //   let answerBean = new AnswerBean()
    //   let selections = questionnaire.questions[i].selections.split('\n')
    //   console.log(selections)
    //   for (let index in selections) {
    //     let selection = selections[index]
    //     console.log('this is the selection:')
    //     console.log(selection)
    //     answerBean.dict[questionnaire.questions.selections[index]] = 0
    //   }
    //   this.answerBeans.push(answerBean)
    // }
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
