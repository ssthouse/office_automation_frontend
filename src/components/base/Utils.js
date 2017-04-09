class Utils {

  static STATE_DRAFT = 'draft'
  static STATE_UNAPPROVED = 'unapproved'
  static STATE_APPROVED = 'approved'
  static STATE_DECLINE = 'decline'

  static getFormatDateStr (date) {
    if (date === undefined || date === null) {
      return ''
    }
    if (!(date instanceof Date)) {
      return ''
    }
    return date.toISOString().slice(0, 10)
  }

  static getStateDescription (state) {
    switch (state) {
      case Utils.STATE_DRAFT:
        return '尚未提交申请, 处于草稿状态'
      case Utils.STATE_UNAPPROVED:
        return '尚未通过审核'
      case Utils.STATE_APPROVED:
        return '已通过审核'
      case Utils.STATE_DECLINE:
        return '审核已被拒绝'
      default:
        return '审核状态不合法'
    }
  }
}

export default Utils
