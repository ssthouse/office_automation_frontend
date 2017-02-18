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

  isEmyty () {
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

  // TODO 保存问卷到服务器
  saveToServer () {

  }

  // TODO 发布问卷,
  publishQuestionnaire () {

  }
}

export default Questionnaire
