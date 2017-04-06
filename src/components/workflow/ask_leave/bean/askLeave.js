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
  static LEAVE_TYPE_DRAFT = 'draft'
  static LEAVE_TYPE_UNAPPROVED = 'unapproved'
  static LEAVE_TYPE_APPROVED = 'approved'

  constructor () {
    this.leaveType = ''
    this.beginDate = ''
    this.endDate = ''
    this.dayNum = 0
    this.description = ''
    this.username = ''
    this.approverUsername = ''
    this.state = AskLeave.LEAVE_TYPE_DRAFT
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
}

export default AskLeave
