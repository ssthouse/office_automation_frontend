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
   "checkComment":"",
   "countersign":"",
   "sign":"",
   "executors":"ssthouse,cgj"
}
 */
class Dispatch {

  static STATE_BEGIN = 'begin'
  static STATE_CHECK = 'check'
  static STATE_COUNTERSIGN = 'countersign'
  static STATE_SIGN = 'sign'

  static Type = ['决议', '决定', '公告', '通告', '通知', '通报', '报告', '请示']

  constructor () {
    this.owner = ''
    this.state = Dispatch.STATE_BEGIN
    this.beginDate = new Date().getTime()
    this.deadline = new Date().getTime()
    this.type = ''
    this.title = ''
    this.targetOrganization = ''
    this.copyToOrganization = ''
    this.content = ''
    this.checkComment = ''
    this.countersign = ''
    this.sign = ''
    this.executors = ''
  }

  static emptyInstance () {
    return new Dispatch()
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
      case Dispatch.STATE_BEGIN:
        break
      case Dispatch.STATE_CHECK:
        if (Utils.isStrEmpty(this.checkComment)) {
          return false
        }
        break
      case Dispatch.STATE_COUNTERSIGN:
        if (Utils.isStrEmpty(this.countersign)) {
          return false
        }
        break
      case Dispatch.STATE_SIGN:
        if (Utils.isStrEmpty(this.sign)) {
          return false
        }
    }
    return true
  }

}

export default Dispatch
