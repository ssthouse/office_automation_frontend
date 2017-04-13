<template>
  <div style="height: 100%; margin-top: -20px;">
    <el-row style="height: 100%;">
      <el-col :span="12" style="height: 100%">
        <!--展示所有数据的折叠面板-->
        <el-card style="margin: 5px;">
          <div slot="header">
            <span style="font-size: larger">我发起的审批:</span>
            <el-button style="margin-left: 40px;"
                       @click="onClickRefreshWorkflowData()">刷新
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
          <div slot="header">
            <span style="font-size: larger">我管理的审批:</span>
            <el-button style="margin-left: 40px;"
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

    <md-button class="md-fab md-fab-bottom-right"
               id="btnAdd"
               @click.native="onClickAddWorkflow()">
      <md-icon>add</md-icon>
    </md-button>

    <!--dialog to select new workflow type-->
    <md-dialog md-open-from="#btnAdd" md-close-from="#btnAdd" ref="dialogAdd">
      <md-dialog-title>新建审批</md-dialog-title>
      <md-dialog-content>
        <md-list>
          <md-button @click.native="onClickAskLeave()">请假</md-button>
          <md-button @click.native="onClickWorkOvertime()">加班</md-button>
          <md-button @click.native="onClickOuting()">出差</md-button>
        </md-list>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TabItem from '../base/TabItem'
  import * as types from '../../store/mutation-types'
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
  import {EventBus} from '../base/EventBus'
  import * as Cons from '../base/Constant'

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
        EventBus.$emit(Cons.EVENT_WORKFLOW_UPDATE_ALL)
      },
      onClickAddWorkflow () {
        this.$refs['dialogAdd'].open()
      },
      onClickAskLeave () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建请假流程', AskLeave.name, null))
        this.$refs['dialogAdd'].close()
      },
      onClickWorkOvertime () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建加班审批', WorkOvertime.name, null))
        this.$refs['dialogAdd'].close()
      },
      onClickOuting () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建出差', Outing.name, null))
        this.$refs['dialogAdd'].close()
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
