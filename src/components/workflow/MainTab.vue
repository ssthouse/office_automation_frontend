<template>
  <div>
    <!--上方 新增的一排按钮-->
    <el-col :span="24">
      <el-card style="margin: 20px;">
        <div style="margin-bottom: -10px;">
          <span style="font-size: large; margin-right: 20px;">新建审批事项:</span>
          <el-button-group>
            <el-button type="primary"
                       class="workflow-tag"
                       @click="onClickAskLeave()">请假
            </el-button>
            <el-button type="primary"
                       class="workflow-tag"
                       @click="onClickWorkOvertime()">加班
            </el-button>
            <el-button type="primary"
                       class="workflow-tag"
                       @click="onClickBusinessTrip">出差
            </el-button>
            <el-button type="primary"
                       class="workflow-tag"
                       @click="onClickOuting()">外出
            </el-button>
            <el-button type="primary"
                       class="workflow-tag"
                       @click="onClickReimburse()">报销
            </el-button>
          </el-button-group>
        </div>
      </el-card>
    </el-col>

    <!--展示所有数据的折叠面板-->
    <el-card style="margin-left: 20px; margin-right: 20px; margin-top: 40px;">
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
                          class="panel-title"></el-collapse-item>
        <el-collapse-item title="出差" name="3"
                          class="panel-title"></el-collapse-item>
        <el-collapse-item title="报销" name="5"
                          class="panel-title"></el-collapse-item>
      </el-collapse>
    </el-card>

    <!--展示管理者数据的面板-->
    <el-card style="margin-left: 20px; margin-right: 20px; margin-top: 40px;">
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
                          class="panel-title"></el-collapse-item>
        <el-collapse-item title="出差" name="3"
                          class="panel-title"></el-collapse-item>
        <el-collapse-item title="报销" name="5"
                          class="panel-title"></el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import NewAskLeave from './ask_leave/AskLeave.vue'
  import TabItem from '../base/TabItem'
  import Vue from 'vue'
  // askLeave
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
  // 事件总线
  import {EventBus} from '../base/EventBus'
  import * as Cons from '../base/Constant'

  // askLeave
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

  export default{
    name: 'workflow-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickAskLeave () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建请假流程', NewAskLeave.name, null))
      },
      onClickWorkOvertime () {

      },
      onClickBusinessTrip () {

      },
      onClickOuting () {

      },
      onClickReimburse () {

      },
      onClickRefreshWorkflowData () {
        // 触发刷新所有的数据的 event
        EventBus.$emit(Cons.EVENT_WORKFLOW_UPDATE_ALL)
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
