class WorkOvertime {

  // 请假申请的状态
  static STATE_DRAFT = 'draft'
  static STATE_UNAPPROVED = 'unapproved'
  static STATE_APPROVED = 'approved'
  static STATE_DECLINE = 'decline'

  /**
   {
      "id": 1,
      "isHoliday": true,
      "beginDate": "2017-11-11",
      "endDate": "2017-11-11",
      "hourNum": 1,
      "description": "des",
      "username": "ssthouse",
      "approverUsername": "ssthouse",
      "state": "draft"
   }
   */
  constructor () {
    this.isHoliday = false
    this.beginDate = ''
    this.endDate = ''
    this.hourNum = 0
    this.description = ''
    this.username = ''
    this.approverUsername = ''
    this.state = WorkOvertime.STATE_DRAFT
  }

  static emptyInstance () {
    return new WorkOvertime()
  }

  static parseWorkOvertimeList (workOvertimeListJson) {
    let workOvertimeList = []
    workOvertimeListJson.forEach(function (workOvertimeJson) {
      workOvertimeList.push(WorkOvertime.parseWorkOvertime(workOvertimeJson))
    })
    return workOvertimeList
  }

  static parseWorkOvertime (workOvertimeJson) {
    let workOvertime = new WorkOvertime()
    Object.assign(workOvertime, workOvertimeJson)
    return workOvertime
  }

  isValid () {
    if (this.beginDate.length === 0 ||
      this.endDate.length === 0 ||
      this.description.length === 0 ||
      this.username.length === 0 ||
      this.approverUsername.length === 0 ||
      this.state.length === 0) {
      return false
    }
    if (this.hourNum === null ||
      this.dayNum <= 0) {
      return false
    }
    return true
  }
}

export default WorkOvertime
