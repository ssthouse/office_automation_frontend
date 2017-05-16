import Utils from '../../../base/Utils'

class News {

  constructor () {
    this.link = ''
    this.title = ''
  }

  /**
   * 判断News实例是否为空
   * @param newsBean
   * @returns {boolean}
   */
  static isEmpty (newsBean) {
    if (newsBean === undefined || newsBean === null) {
      return true
    }
    if (Utils.isStrEmpty(newsBean.link) || Utils.isStrEmpty(newsBean.title)) {
      return true
    }
    return false
  }

  static newInstance () {
    let news = new News()
    return news
  }
}

export default News
