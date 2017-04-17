import QuestionnaireCard from '../tools/questionnaire/QuestionnaireCard.vue'
import QuestionnaireAdminCard from '../tools/questionnaire/OwnedQuestionnaireCard.vue'
import VotingCard from '../tools/voting/VotingCard.vue'
import VotingCardAdmin from '../tools/voting/OwnedVotingCard.vue'

export const BASE_URL = 'http://127.0.0.1:8080/office_automation_backend'

// 问卷
export const TOOLS_QUESTIONNAIRE = 'questionnaireCard'
// export const TOOLS_QUESTIONNAIRE_IS = QuestionnaireCard.name
// 问卷管理员
export const TOOLS_QUESTIONNAIRE_ADMIN = 'questionnaireCardAdmin'
// export const TOOLS_QUESTIONNAIRE_ADMIN_IS = QuestionnaireAdminCard.name
// 投票
export const TOOLS_VOTING = 'votingCard'
// export const TOOLS_VOTING_IS = VotingCard.name
export const TOOLS_VOTING_ADMIN = 'votingCardAdmin'
// export const TOOLS_VOTING_ADMIN_IS = VotingCardAdmin.name

export const ToolsPageComponent = {
  questionnaireCard: QuestionnaireCard.name,
  questionnaireCardAdmin: QuestionnaireAdminCard.name,
  votingCard: VotingCard.name,
  votingCardAdmin: VotingCardAdmin.name
}
