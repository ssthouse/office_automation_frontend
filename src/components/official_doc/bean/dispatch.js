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
}

export default Dispatch
