class VoteOption {

  constructor () {
    this.votingId = 1
    this.title = ''
  }

  isValid () {
    if (this.title.length === 0) {
      return false
    }
    return true
  }

  static parseVoteOptionData (data) {
    let voteOption = new VoteOption()
    Object.assign(voteOption, data)
    return voteOption
  }
}

class Voting {

  constructor () {
    this.createrId = ''
    this.votingId = 0
    this.title = ''
    this.deadline = ''
    this.description = ''
    this.voteOptions = []
    this.published = false
    this.multipleChoice = false
  }

  isValid () {
    if (this.title.length === 0 ||
      this.deadline.length === 0 ||
      this.createrId.length === 0) {
      return false
    }
    if (this.voteOptions.length === 0) {
      return false
    }
    for (let index in this.voteOptions) {
      let option = this.voteOptions[index]
      if (!option.isValid()) {
        return false
      }
    }
    return true
  }

  /**
   * 添加选项
   * @param voteOption
   */
  addVoteOption (voteOption) {
    this.voteOptions.push(voteOption)
  }

  /**
   * 添加一个空的选项
   */
  addEmptyOption () {
    let emptyOption = new VoteOption()
    this.voteOptions.push(emptyOption)
  }

  static getEmptyInstance () {
    return new Voting()
  }

  /**
   * 从json数据中得到 带有全部方法属性的voting对象
   * @param votingData
   */
  static parseVotingData (votingData) {
    let voting = new Voting()
    Object.assign(voting, votingData)
    // 填充votingOption的方法属性
    for (let index in voting.voteOptions) {
      voting.voteOptions[index] = VoteOption.parseVoteOptionData(voting.voteOptions[index])
    }
    return voting
  }
}

export default Voting
