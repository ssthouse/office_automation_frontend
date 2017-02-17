class Question {
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
