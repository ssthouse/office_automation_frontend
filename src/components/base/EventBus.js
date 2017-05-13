import Vue from 'vue'
export const instance = new Vue()

// workflow module event
export const EVENT_WORKFLOW_UPDATE_ALL = 'workflow/update'
export const EVENT_WORKFLOW_UPDATE_ASK_LEAVE = 'workflow/ask_leave/update'
export const EVENT_WORKFLOW_UPDATE_WORK_OVERTIME = 'workflow/work_overtime/update'
export const EVENT_WORKFLOW_UPDATE_OUTING = 'workflow/outing/update'

// official doc event
export const EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH = 'official_doc/dispatch/update'
export const EVENT_OFFICIAL_DOC_CLICK_NEW = 'official_doc/click_new'

// new tab event
export const EVENT_HOMEPAGE_NEW_TAB = 'homepage/new_tab'
export const EVENT_WORKFLOW_NEW_TAB = 'workflow/new_tab'
export const EVENT_WORKFLOW_CLICK_NEW = 'workflow/click_new'
export const EVENT_OFFICIAL_DOC_NEW_TAB = 'official_doc/new_tab'
export const EVENT_TOOLS_NEW_TAB = 'tools/new_tab'

export const EVENT_MAIN_UPDATE_USER_CONFIG = 'main/user_config/update'

// tools panels update
export const EVENT_QUESTIONNAIRE_UPDATE = 'tools/questionnaire/update'
