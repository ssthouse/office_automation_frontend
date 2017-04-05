<template>
  <div>
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
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import NewAskLeave from './ask_leave/NewAskLeave.vue'
  import TabItem from '../base/TabItem'

  export default{
    name: 'workflow-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickAskLeave () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建请假流程', NewAskLeave.name, ''))
      },
      onClickWorkOvertime () {

      },
      onClickBusinessTrip () {

      },
      onClickOuting () {

      },
      onClickReimburse () {

      }
    }
  }
</script>

<style>
  .workflow-tag {
    font-size: medium;
  }
</style>
