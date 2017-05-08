<template>
  <div style="height: auto;margin-top: -20px;">
    <el-row>
      <el-col :span="12">
        <!--展示所有数据的折叠面板-->
        <el-card style="margin: 5px;">
          <div slot="header" style="height: 20px;">
            <span style="font-size: larger; float: left;">我发起的审批:</span>
            <el-button style="float: right; vertical-align: middle; margin-left: 10px;"
                       @click="onClickRefreshWorkflowData()">刷新
            </el-button>
            <el-button style="float: right;"
                       @click="onClickAddBtn()">新增
            </el-button>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="请假" name="1"
                              class="panel-title">
              <ask-leave-panel></ask-leave-panel>
            </el-collapse-item>
            <el-collapse-item title="加班" name="2"
                              class="panel-title">
              <work-overtime-panel></work-overtime-panel>
            </el-collapse-item>
            <el-collapse-item title="出差" name="3"
                              class="panel-title">
              <outing-panel></outing-panel>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>

      <el-col :span="12">
        <!--展示管理者数据的面板-->
        <el-card style="margin: 5px;">
          <div slot="header" style="height: 20px;">
            <span style="font-size: larger; float: left;">我管理的审批:</span>
            <el-button style="float: right; margin-bottom: 20px;"
                       @click="onClickRefreshWorkflowData()">刷新
            </el-button>
          </div>
          <el-collapse accordion>
            <el-collapse-item title="请假" name="1"
                              class="panel-title">
              <ask-leave-admin-panel></ask-leave-admin-panel>
            </el-collapse-item>
            <el-collapse-item title="加班" name="2"
                              class="panel-title">
              <work-overtime-admin-panel></work-overtime-admin-panel>
            </el-collapse-item>
            <el-collapse-item title="出差" name="3"
                              class="panel-title">
              <outing-admin-panel></outing-admin-panel>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  // askLeave
  import AskLeave from './ask_leave/AskLeave.vue'
  import AskLeavePanel from './ask_leave/panel/AskLeavePanel.vue'
  import AskLeaveAdminPanel from './ask_leave/panel/AskLeaveAdminPanel.vue'
  import AskLeaveDetail from './ask_leave/AskLeaveDetail.vue'
  import AskLeaveAdminDetail from './ask_leave/AskLeaveAdminDetail.vue'
  // work-overtime
  import WorkOvertime from './work_overtime/WorkOvertime.vue'
  import WorkOvertimeDetail from './work_overtime/WorkOvertimeDetail.vue'
  import WorkOvertimeAdminDetail from './work_overtime/WorkOvertimeAdminDetail.vue'
  import WorkOvertimePanel from './work_overtime/panel/WorkOvertimePanel.vue'
  import WorkOvertimeAdminPanel from './work_overtime/panel/WorkOvertimeAdminPanel.vue'
  // outing
  import Outing from './outing/Outing.vue'
  import OutingDetail from './outing/OutingDetail.vue'
  import OutingAdminDetail from './outing/OutingAdminDetail.vue'
  import OutingPanel from './outing/panel/OutingPanel.vue'
  import OutingAdminPanel from './outing/panel/OutingAdminPanel.vue'
  // 事件总线
  import * as EventBus from '../base/EventBus'

  // askLeave
  Vue.component(AskLeave.name, AskLeave)
  Vue.component(AskLeavePanel.name, AskLeavePanel)
  Vue.component(AskLeaveAdminPanel.name, AskLeaveAdminPanel)
  Vue.component(AskLeaveDetail.name, AskLeaveDetail)
  Vue.component(AskLeaveAdminDetail.name, AskLeaveAdminDetail)
  // work-overtime
  Vue.component(WorkOvertime.name, WorkOvertime)
  Vue.component(WorkOvertimeDetail.name, WorkOvertimeDetail)
  Vue.component(WorkOvertimeAdminDetail.name, WorkOvertimeAdminDetail)
  Vue.component(WorkOvertimePanel.name, WorkOvertimePanel)
  Vue.component(WorkOvertimeAdminPanel.name, WorkOvertimeAdminPanel)
  // outing
  Vue.component(Outing.name, Outing)
  Vue.component(OutingDetail.name, OutingDetail)
  Vue.component(OutingAdminDetail.name, OutingAdminDetail)
  Vue.component(OutingPanel.name, OutingPanel)
  Vue.component(OutingAdminPanel.name, OutingAdminPanel)

  export default{
    name: 'workflow-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickRefreshWorkflowData () {
        // 触发刷新所有的数据的 event
        EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_ALL)
      },
      onClickAddBtn () {
        EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_CLICK_NEW)
      }
    },
    components: {
      'ask-leave-panel': AskLeavePanel
    }
  }
</script>

<style>
  .workflow-tag {
    font-size: medium;
  }

  .panel-title {
    text-align: left;
  }
</style>
