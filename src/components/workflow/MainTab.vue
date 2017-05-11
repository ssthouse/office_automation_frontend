<template>
  <div style="height: auto;margin-top: -20px;">
    <el-row>
      <el-col :span="12">
        <!--展示所有数据的折叠面板-->
        <el-card style="margin: 5px;">
          <div slot="header" style="height: 20px;">
            <span style="font-size: larger; float: left;">我发起的审批:</span>
            <el-button
              style="float: right; vertical-align: middle; margin-left: 10px; visibility: collapse; margin-bottom: -50px;"
              @click="onClickRefreshWorkflowData()">刷新
            </el-button>
            <el-button style="float: right;"
                       @click="onClickAddBtn()">新增
            </el-button>
          </div>
          <el-collapse accordion>
            <el-collapse-item v-for="index in 3"
                              class="panel-title">
              <template slot="title">
                <span>{{titleLabelList[index-1]}}</span>
                <el-badge :value="getBadgeNum(index-1, false, 0)"
                          style="margin-left: 40px;">
                  <el-tag type="grey">草稿</el-tag>
                </el-badge>
                <el-badge :value='getBadgeNum(index-1, false, 1)'
                          style="margin-left: 20px;">
                  <el-tag type="primary">待审批</el-tag>
                </el-badge>
                <el-badge :value="getBadgeNum(index-1, false, 2)"
                          style="margin-left: 20px;">
                  <el-tag type="success">已通过</el-tag>
                </el-badge>
                <el-badge :value="getBadgeNum(index-1, false, 3)"
                          style="margin-left: 20px;">
                  <el-tag type="danger">未通过</el-tag>
                </el-badge>
              </template>
              <div v-bind:is="componentIsList[index-1]"></div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>

      <el-col :span="12">
        <!--展示管理者数据的面板-->
        <el-card style="margin: 5px;">
          <div slot="header" style="height: 20px;">
            <span style="font-size: larger; float: left;">我管理的审批:</span>
            <el-button style="float: right; margin-bottom: 20px; visibility: hidden"
                       @click="onClickRefreshWorkflowData()">刷新
            </el-button>
          </div>
          <el-collapse accordion>
            <el-collapse-item v-for="index in 3"
                              class="panel-title">
              <template slot="title">
                <span>{{titleLabelList[index-1]}}</span>
                <el-badge :value="getBadgeNum(index-1, true, 0)"
                          style="margin-left: 40px; visibility: collapse;">
                  <el-tag type="grey">草稿</el-tag>
                </el-badge>
                <el-badge :value="getBadgeNum(index-1, true, 1)"
                          style="margin-left: -40px;">
                  <el-tag type="primary">待审批</el-tag>
                </el-badge>
                <el-badge :value="getBadgeNum(index-1, true, 2)"
                          style="margin-left: 20px;">
                  <el-tag type="success">已通过</el-tag>
                </el-badge>
                <el-badge :value="getBadgeNum(index-1, true, 3)"
                          style="margin-left: 20px;">
                  <el-tag type="danger">未通过</el-tag>
                </el-badge>
              </template>
              <div v-bind:is="componentIsListAdmin[index-1]"></div>
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
      return {
        titleLabelList: ['请假', '加班', '出差'],
        componentIsListAdmin: ['ask-leave-admin-panel', 'work-overtime-admin-panel', 'outing-admin-panel'],
        componentIsList: ['ask-leave-panel', 'work-overtime-panel', 'outing-panel'],
        // state name list
        stateList: ['draft', 'unapproved', 'approved', 'decline']
      }
    },
    props: [],
    methods: {
      onClickRefreshWorkflowData () {
        // 触发刷新所有的数据的 event
        EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_ALL)
      },
      onClickAddBtn () {
        EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_CLICK_NEW)
      },
      getBadgeNum (typeIndex, isAdmin, stateIndex) {
        let stateName = this.stateList[stateIndex]
        if (!isAdmin) {
          switch (typeIndex) {
            case 0:
              return this.getStateNumInList(this.$store.state.workflowModule.askLeaveList, stateName)
            case 1:
              return this.getStateNumInList(this.$store.state.workflowModule.workOvertimeList, stateName)
            case 2:
              return this.getStateNumInList(this.$store.state.workflowModule.outingList, stateName)
          }
        } else {
          switch (typeIndex) {
            case 0:
              return this.getStateNumInList(this.$store.state.workflowModule.askLeaveAdminList, stateName)
            case 1:
              return this.getStateNumInList(this.$store.state.workflowModule.workOvertimeAdminList, stateName)
            case 2:
              return this.getStateNumInList(this.$store.state.workflowModule.outingAdminList, stateName)
          }
        }
      },
      getStateNumInList (beanList, stateName) {
        let result = 0
        for (let bean of beanList) {
          if (bean.state === stateName) {
            result += 1
          }
        }
        return result
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

  .el-badge__content {
    background-color: #1d90e6;
    margin-top: 10px;
  }
</style>
