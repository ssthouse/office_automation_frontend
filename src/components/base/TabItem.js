class TabItem {

  /**
   * 构造方法
   * @param tabLabel
   * @param tabIs
   * @param data 可选, 用于传递数据
   */
  constructor (tabLabel, tabIs, data) {
    this.tabLabel = tabLabel
    this.tabIs = tabIs
    this.data = data
  }
}

export default TabItem
