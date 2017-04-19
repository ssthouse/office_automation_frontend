/**
 * Created by ssthouse on 19/04/2017.
 */
class Dispatch {

  static STATE_BEGIN = 'begin'
  static STATE_CHECK = 'check'
  static STATE_COUNTERSIGN = 'countersign'
  static STATE_SIGN = 'sign'

  constructor () {
    this.owner = ''
    this.state = ''
    this.beginDate = new Date().getTime()
    this.deadline = new Date().getTime()
    this.type = ''
    this.title = ''
    this.targetOrganization = ''
    this.copyToOrganization = ''
    this.content = ''
    this.check = ''
    this.countersign = ''
    this.sign = ''
    this.executors = ''
  }

  static emptyInstance () {
    return new Dispatch()
  }

  static Type = ['决议', '决定', '公告', '通告', '通知', '通报', '报告', '请示']
}

export default Dispatch
