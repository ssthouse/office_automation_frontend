import Utils from '../../../base/Utils'

class Meeting {

  constructor () {
    this.topic = ''
    this.hoster = ''
    this.meetingRoom = ''
    this.participant = ''
    this.sponsor = ''
    this.beginDate = ''
    this.beginTime = ''
    this.endTime = ''
    this.description = ''
  }

  isValid () {
    let isStrValid = !Utils.isAnyEmpty(this.topic, this.hoster, this.meetingRoom,
      this.participant, this.sponsor, this.description)
    let isNumValid = !Utils.isAnyNumEmpty(this.beginDate, this.beginDate, this.endTime)
    if (isStrValid && isNumValid) {
      return true
    }
    return false
  }

  static getEmptyMeeting () {
    return new Meeting()
  }
}

export default Meeting
