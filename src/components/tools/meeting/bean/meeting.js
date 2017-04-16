class Meeting {

  constructor () {
    this.topic = ''
    this.hoster = ''
    this.mettingRoom = ''
    this.participant = ''
    this.sponsor = ''
    this.beginDate = ''
    this.beginTime = ''
    this.endTime = ''
  }

  static getEmptyMeeting () {
    return new Meeting()
  }
}

export default Meeting
