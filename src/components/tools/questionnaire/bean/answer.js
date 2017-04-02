class Answer {

  constructor (index, type, answer, selection) {
    this.index = index
    this.type = type
    this.answer = answer
    this.selection = selection
  }

  isEmpty () {
    return this.index === null || this.type === null || this.answer === null
  }

  static getAnswer (index, type) {
    let answer = new Answer()
    answer.index = index
    answer.type = type
    answer.answer = ''
    answer.selections = []
    return answer
  }
}
export default Answer
