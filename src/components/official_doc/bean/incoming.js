/**
 * Created by ssthouse on 19/04/2017.
 */
import Utils from '../../base/Utils'

/**
 {
   "owner":"ssthouse",
   "state":"begin",
   "beginDate":1492684270881,
   "deadline":1492684270881,
   "type":"决议",
   "title":"标题",
   "targetOrganization":"单位一",
   "copyToOrganization":"单位二",
   "content":"这里是正文",
   "propose":"",
   "approve":"",
   "deal":"",
   "executors":"ssthouse,cgj"
}
 */
class Incoming {

  static STATE_BEGIN = 'begin'
  static STATE_PROPOSE = 'propose'
  static STATE_APPROVE = 'approve'
  static STATE_DEAL = 'deal'
  static STATE_FINISH = 'finish'

  static Type = ['决议', '决定', '公告', '通告', '通知', '通报', '报告', '请示']

  constructor () {
    this.owner = ''
    this.state = Incoming.STATE_BEGIN
    this.beginDate = new Date().getTime()
    this.deadline = new Date().getTime()
    this.type = ''
    this.title = ''
    this.targetOrganization = ''
    this.copyToOrganization = ''
    this.content = ''
    this.propose = ''
    this.approve = ''
    this.deal = ''
    this.executors = ''
  }

  static emptyInstance () {
    return new Incoming()
  }

  isValid () {
    if (Utils.isAnyNumEmpty(this.beginDate, this.deadline)) {
      return false
    }
    if (Utils.isAnyEmpty(this.owner, this.state, this.type, this.title,
        this.targetOrganization, this.copyToOrganization, this.content, this.executors)) {
      return false
    }
    // 根据不同的状态判断数据是否完整
    switch (this.state) {
      case Incoming.STATE_BEGIN:
        break
      case Incoming.STATE_PROPOSE:
        if (Utils.isStrEmpty(this.propose)) {
          return false
        }
        break
      case Incoming.STATE_APPROVE:
        if (Utils.isStrEmpty(this.approve)) {
          return false
        }
        break
      case Incoming.STATE_DEAL:
        if (Utils.isStrEmpty(this.deal)) {
          return false
        }
    }
    return true
  }

}

export default Incoming
