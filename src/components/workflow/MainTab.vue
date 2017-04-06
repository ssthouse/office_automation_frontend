<template>
  <div>
    <!--上方 新增的一排按钮-->
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div style="margin-bottom: -10px;">
            <span style="font-size: large; float: left; margin-left: 20px;">新建审批事项:</span>
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
          </div>
        </el-card>
      </el-col>

    </el-row>

    <!--展示所有数据的折叠面板-->

    <el-card type="box-card"
             style="margin-left: 20px; margin-right: 20px;">
      <div slot="header">
        <span>我的审批:</span>
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
        <el-collapse-item title="外出" name="4"
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
  import AskLeavePanel from './panel/AskLeavePanel.vue'
  // 事件总线
  import {EventBus} from '../base/EventBus'
  import * as Cons from '../base/Constant'

  Vue.component(AskLeavePanel.name, AskLeavePanel)

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
