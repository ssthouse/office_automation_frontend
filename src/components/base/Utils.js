class Utils {

  static getFormatDateStr (date) {
    if (date === undefined || date === null) {
      return ''
    }
    if (!(date instanceof Date)) {
      return ''
    }
    return date.toISOString().slice(0, 10)
  }
}

export default Utils
