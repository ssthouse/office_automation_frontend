class AskLeave {

  constructor () {
    this.leaveType = ''
    this.beginDate = ''
    this.endDate = ''
    this.dayNum = 0
    this.description = ''
    this.approver = ''
  }

  isValid () {
    if (this.leaveType.length === 0 ||
      this.beginDate.length === 0 ||
      this.endDate.length === 0 ||
      this.description.length === 0 ||
      this.approver.length === 0) {
      return false
    }
    if (this.dayNum === null ||
      this.dayNum <= 0) {
      return false
    }
    return true
  }
}

export default AskLeave
