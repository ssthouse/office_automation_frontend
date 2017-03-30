class Question {

  /**
   * 传入Json的存数据对象
   * @param questionData
   */
  constructor (questionData) {
    Object.assign(this, questionData)
  }

  isEmpty () {
    switch (this.type) {
      case QUESTION_TYPES.RADIO:
        if (this.title.length === 0) {
          return false
        }
        if (this.selections.length === 0) {
          return false
        }
        break
      case QUESTION_TYPES.CHECK_BOX:
        if (this.title.length === 0) {
          return false
        }
        if (this.selections.length === 0) {
          return false
        }
        break
      case QUESTION_TYPES.TEXT_AREA:
        if (this.title.length === 0) {
          return false
        }
        break
    }
    return true
  }

  getSelections () {
    return this.selections.split('\n')
  }

  clearQuestion () {
    this.title = ''
    this.selections = ''
  }

  getCopy () {
    return Object.assign(new Question(), this)
  }

  static getQuestion (type) {
    let question = new Question()
    question.title = ''
    question.type = type
    question.selections = ''
    return question
  }
}

const QUESTION_TYPES = {
  RADIO: 'radio',
  CHECK_BOX: 'checkbox',
  TEXT_AREA: 'textArea'
}

export {
  Question,
  QUESTION_TYPES
}
