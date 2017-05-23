import QuestionnaireCard from '../tools/questionnaire/QuestionnaireCard.vue'
import QuestionnaireAdminCard from '../tools/questionnaire/OwnedQuestionnaireCard.vue'
import VotingCard from '../tools/voting/VotingCard.vue'
import VotingCardAdmin from '../tools/voting/OwnedVotingCard.vue'
import MeetingCard from '../tools/meeting/MeetingCard.vue'
import MeetingCardAdmin from '../tools/meeting/OwnedMeetingCard.vue'

import Calendar from '../home_page/calendar/CalendarCard.vue'
import ImgNews from '../home_page/img_news/ImgNewsCard.vue'
import News from '../home_page/news/NewsCard.vue'

export const BASE_URL = 'http://127.0.0.1:8080/office_automation_backend'

export const HOMEPAGE_IMG_NEWS = 'imgNewsCard'
export const HOMEPAGE_NEWS = 'newsCard'
export const HOMEPAGE_CALENDAR = 'calendarCard'

// 问卷
export const TOOLS_QUESTIONNAIRE = 'questionnaireCard'
export const TOOLS_QUESTIONNAIRE_ADMIN = 'questionnaireCardAdmin'
// 投票
export const TOOLS_VOTING = 'votingCard'
export const TOOLS_VOTING_ADMIN = 'votingCardAdmin'
// 会议
export const TOOLS_MEETING = 'meetingCard'
export const TOOLS_MEETING_ADMIN = 'meetingCardAdmin'

export const ComponentMap = {
  questionnaireCard: QuestionnaireCard.name,
  questionnaireCardAdmin: QuestionnaireAdminCard.name,
  votingCard: VotingCard.name,
  votingCardAdmin: VotingCardAdmin.name,
  meetingCard: MeetingCard.name,
  meetingCardAdmin: MeetingCardAdmin.name,
  imgNewsCard: ImgNews.name,
  newsCard: News.name,
  calendarCard: Calendar.name
}
