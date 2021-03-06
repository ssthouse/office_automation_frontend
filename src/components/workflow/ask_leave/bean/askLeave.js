/**
 {
    "id": 1,
    "leaveType": "sick",
    "beginDate": "2017-11-11",
    "endDate": "2017-11-11",
    "dayNum": 1,
    "description": "des",
    "username": "ssthouse",
    "approverUsername": "ssthouse",
    "state": "begin"
}
 */

class AskLeave {

  // 请假申请的状态
  static STATE_DRAFT = 'draft'
  static STATE_UNAPPROVED = 'unapproved'
  static STATE_APPROVED = 'approved'
  static STATE_DECLINE = 'decline'

  constructor () {
    this.leaveType = ''
    this.beginDate = ''
    this.endDate = ''
    this.dayNum = 0
    this.description = ''
    this.username = ''
    this.approverUsername = ''
    this.state = AskLeave.STATE_DRAFT
  }

  isValid () {
    if (this.leaveType.length === 0 ||
      this.beginDate.length === 0 ||
      this.endDate.length === 0 ||
      this.description.length === 0 ||
      this.username.length === 0 ||
      this.approverUsername.length === 0 ||
      this.state.length === 0) {
      return false
    }
    if (this.dayNum === null ||
      this.dayNum <= 0) {
      return false
    }
    return true
  }

  static parseAskLeave (askLeaveJson) {
    let askLeave = new AskLeave()
    Object.assign(askLeave, askLeaveJson)
    return askLeave
  }

  static parseAskLeaveList (askLeaveListJson) {
    let askLeaveList = []
    askLeaveListJson.forEach(function (askLeaveJson) {
      askLeaveList.push(AskLeave.parseAskLeave(askLeaveJson))
    })
    return askLeaveList
  }
}

export default AskLeave
