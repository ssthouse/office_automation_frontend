import Dispatch from '../official_doc/bean/dispatch'
import Incoming from '../official_doc/bean/incoming'
import * as EventBus from './EventBus'

class Utils {

  static STATE_DRAFT = 'draft'
  static STATE_UNAPPROVED = 'unapproved'
  static STATE_APPROVED = 'approved'
  static STATE_DECLINE = 'decline'

  static jumpToTools () {
    EventBus.instance.$emit(EventBus.EVENT_TO_TOOLS)
  }

  static getFormatDateStr (date) {
    if (date === undefined || date === null) {
      return ''
    }
    if (!(date instanceof Date)) {
      return ''
    }
    return date.toISOString().slice(0, 10)
  }

  static getFormatDateStrFromMillis (millis) {
    let timeDate = new Date(millis)
    return timeDate.toISOString().slice(0, 10)
  }

  static getStateDescription (state) {
    switch (state) {
      case Utils.STATE_DRAFT:
        return '尚未提交申请, 处于草稿状态'
      case Utils.STATE_UNAPPROVED:
        return '尚未经过审核'
      case Utils.STATE_APPROVED:
        return '已通过审核'
      case Utils.STATE_DECLINE:
        return '审核已被拒绝'
      default:
        return '审核状态不合法'
    }
  }

  static isStrEmpty (str) {
    if (str === null ||
      str === undefined ||
      str.length === 0) {
      return true
    }
    return false
  }

  /**
   * 判断传入的数据中是否有一个为空
   */
  static isAnyEmpty () {
    for (let item of arguments) {
      if (this.isStrEmpty(item)) {
        return true
      }
    }
    return false
  }

  static isNumEmpty (num) {
    if (num === null ||
      num === undefined ||
      num <= 0) {
      return true
    }
    return false
  }

  static isAnyNumEmpty () {
    for (let num of arguments) {
      if (this.isNumEmpty(num)) {
        return true
      }
    }
    return false
  }

  /**
   * 根据state名称 获得相应的颜色
   * @param stateName draft | unapproved | approved | decline
   */
  static getStateColor (stateName) {
    switch (stateName) {
      case 'draft':
        return 'grey'
      case 'unapproved':
        return 'primary'
      case 'approved':
        return 'success'
      case 'decline':
        return 'danger'
    }
  }

  static getStateName (state) {
    switch (state) {
      case 'draft':
        return '草稿'
      case 'unapproved':
        return '待审核'
      case 'approved':
        return '已通过'
      case 'decline':
        return '未通过'
    }
  }

  static getOfficialDocStateName (state) {
    switch (state) {
      case Dispatch.STATE_BEGIN:
        return '待核稿'
      case Dispatch.STATE_CHECK:
        return '待会签'
      case Dispatch.STATE_COUNTERSIGN:
        return '待签收'
      case Dispatch.STATE_SIGN:
        return '已完成'
      case Dispatch.STATE_FINISH:
        return '已完成'
    }
  }

  static getOfficialDocStateColor (stateName) {
    switch (stateName) {
      // 开始状态
      case Dispatch.STATE_BEGIN:
        return 'grey'
      // 发文单执行状态
      case Dispatch.STATE_CHECK:
      case Dispatch.STATE_COUNTERSIGN:
      case Dispatch.STATE_SIGN:
        return 'primary'
      // 收文单执行状态
      case Incoming.STATE_PROPOSE:
      case Incoming.STATE_APPROVE:
      case Incoming.STATE_DEAL:
        return 'primary'
      // 完成状态
      case Dispatch.STATE_FINISH:
        return 'success'
    }
  }
}

export default Utils
