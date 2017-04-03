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
}

class Voting {

  constructor () {
    this.createrId = ''
    this.votingId = 1
    this.title = ''
    this.deadline = ''
    this.description = ''
    this.voteOptions = []
  }

  isValid () {
    if (this.title.length === 0 ||
      this.deadline.length === 0) {
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
}

export default Voting
