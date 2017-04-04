// main 用于存储全局使用的数据: user
export const MAIN_SET_USER = 'main/set_user'

export const ACTION_GET_USERINFO = 'main/action/get_userinfo'

// Homepage 模块
export const HOMEPAGE_ADD_TAB = 'homepage/add_tab'
export const HOMEPAGE_REMOVE_TAB = 'homepage/remove_tab'

// Workflow 模块
export const WORKFLOW_ADD_TAB = 'workflow/add_tab'
export const WORKFLOW_REMOVE_TAB = 'workflow/remove_tab'

// PublicInfo 信息发布模块
export const PUBLIC_INFO_ADD_TAB = 'public_info/add_tab'
export const PUBLIC_INFO_REMOVE_TAB = 'public_info/remove_tab'

// OfficialDoc 公文管理模块
export const OFFICIAL_DOC_ADD_TAB = 'official_doc/add_tab'
export const OFFICIAL_DOC_REMOVE_TAB = 'official_doc/remove_tab'

// Tools 模块
export const TOOLS_ADD_TAB = 'tools/add_tab'
export const TOOLS_REMOVE_TAB = 'tools/remove_tab'

// Tools => questionnaire
export const TOOLS_SET_OPEN_QUESTIONNAIRE_LIST = 'tool/set_open_questionnaire'
export const TOOLS_SET_OWNED_QUESTIONNAIRE_LIST = 'tool/set_owned_questionnaire'

// Tools => voting
export const TOOLS_SET_VOTING_OPEN_LIST = 'tool/set_voting_open_list'
export const TOOLS_SET_VOTING_OWNED_LIST = 'tool/set_voting_owned_list'

// 获取用户相关的questionnaire到store
export const ACTION_FETCH_QUESTIONNAIRE = 'tool/action/fetch_questionnaire'
// 获取关于voting 的数据
export const ACTION_FETCH_OPEN_VOTING = 'tool/action/fetch_open_voting'
export const ACTION_FETCH_OWNED_VOTING = 'tool/action/fetch_owned_voting'

