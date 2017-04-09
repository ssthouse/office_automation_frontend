/**
 {
    "id": 1,
    "destination": "ShangHai",
    "beginDate": "2017-11-11",
    "endDate": "2017-11-11",
    "dayNum": 1,
    "description": "des",
    "username": "ssthouse",
    "approverUsername": "ssthouse",
    "state": "begin"
}
 */

class Outing {

  // 申请的状态
  static STATE_DRAFT = 'draft'
  static STATE_UNAPPROVED = 'unapproved'
  static STATE_APPROVED = 'approved'
  static STATE_DECLINE = 'decline'

  constructor () {
    this.destination = ''
    this.beginDate = ''
    this.endDate = ''
    this.dayNum = 0
    this.description = ''
    this.username = ''
    this.approverUsername = ''
    this.state = Outing.STATE_DRAFT
  }

  isValid () {
    if (this.destination.length === 0 ||
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

  static parseOuting (outingJson) {
    let outing = new Outing()
    Object.assign(outing, outingJson)
    return outing
  }

  static parseOutingList (outingListJson) {
    let outingList = []
    outingListJson.forEach(function (outingJson) {
      outingList.push(Outing.parseOuting(outingJson))
    })
    return outingList
  }

}

export default Outing
