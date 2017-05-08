// main 用于存储全局使用的数据: user
export const MAIN_SET_USER = 'main/set_user'
export const MAIN_SET_USER_CONFIG = 'main/set_user_config'

export const ACTION_GET_USERINFO = 'main/action/get_userinfo'
export const ACTION_GET_USER_CONFIG = 'main/action/get_user_config'
export const ACTION_POST_USER_CONFIG_TOOLS = 'main/action/set_tools_config'
export const ACTION_POST_USER_CONFIG_HOMEPAGE = 'main/action/set_home_page_config'

// Homepage 模块
export const HOMEPAGE_ADD_TAB = 'homepage/add_tab'
export const HOMEPAGE_REMOVE_TAB = 'homepage/remove_tab'

// Workflow 模块
export const WORKFLOW_ADD_TAB = 'workflow/add_tab'
export const WORKFLOW_REMOVE_TAB = 'workflow/remove_tab'
export const WORKFLOW_SET_ASK_LEAVE = 'workflow/ask_leave'
export const WORKFLOW_SET_ASK_LEAVE_ADMIN = 'workflow/ask_leave_admin'
export const WORKFLOW_SET_WORK_OVERTIME = 'workflow/work_overtime'
export const WORKFLOW_SET_WORK_OVERTIME_ADMIN = 'workflow/work_overtime_admin'
export const WORKFLOW_SET_OUTING = 'workflow/outing'
export const WORKFLOW_SET_OUTING_ADMIN = 'workflow/outing_admin'

// OfficialDoc 公文管理模块
export const OFFICIAL_DOC_ADD_TAB = 'official_doc/add_tab'
export const OFFICIAL_DOC_REMOVE_TAB = 'official_doc/remove_tab'

// Tools 模块
export const TOOLS_ADD_TAB = 'tools/add_tab'
export const TOOLS_REMOVE_TAB = 'tools/remove_tab'

// 获取用户相关的questionnaire到store
export const ACTION_FETCH_QUESTIONNAIRE = 'tools/action/fetch_questionnaire'
// 获取关于voting 的数据
export const ACTION_FETCH_OPEN_VOTING = 'tools/action/fetch_open_voting'
export const ACTION_FETCH_OWNED_VOTING = 'tools/action/fetch_owned_voting'
export const ACTION_FETCH_OPEN_MEETING = 'tools/action/fetch_open_meeting'
export const ACTION_FETCH_OWNED_MEETING = 'tools/action/fetch_owned_meeting'

