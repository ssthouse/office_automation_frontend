class Question {

  /**
   *
   * @param title
   * @param questionType
   * @param selections 各个选项之间  用换行符隔开
   */
  constructor (title, questionType, selections) {
    this.title = title
    this.type = questionType
    this.selections = selections
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
    console.log(this.selections)
    return new Question(this.title, this.type, this.selections)
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
