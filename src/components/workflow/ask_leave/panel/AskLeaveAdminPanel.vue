<template>
  <div>
    <!--需要展示的数据:-->
    <!--{-->
    <!--"id": 1,-->
    <!--"leaveType": "sick",-->
    <!--"beginDate": "2017-11-11",-->
    <!--"endDate": "2017-11-11",-->
    <!--"dayNum": 1,-->
    <!--"description": "des",-->
    <!--"username": "ssthouse",-->
    <!--"approverUsername": "ssthouse",-->
    <!--"state": "begin"-->
    <!--}-->
    <el-table
      :data="askLeaveList"
      stripe
      style="width: 100%">
      <el-table-column prop="leaveType"
                       label="类型"
                       width="100"></el-table-column>
      <el-table-column label="天数"
                       width="100"
                       prop="dayNum"></el-table-column>
      <el-table-column label="状态"
                       width="100"
                       prop="state"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <!--the two button can is able only when in unapproved || approved state-->
          <el-button
            size="small"
            @click="handleDetail(scope.$index, scope.row)">详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as Cons from '../../../base/Constant'
  import * as MUTATION_TYPES from '../../../../store/mutation-types'
  import AskLeave from '../../ask_leave/bean/askLeave'
  import AskLeaveDetail from '../../ask_leave/AskLeaveDetail.vue'
  import AskLeaveAdminDetail from '../../ask_leave/AskLeaveAdminDetail.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import {EventBus} from '../../../base/EventBus'

  const URL_GET_ADMIN_ASK_LEAVE = Cons.BASE_URL + '/ask_leave/admin'

  export default{
    name: 'ask-leave-admin-panel',
    data () {
      return {
        askLeaveList: []
      }
    },
    props: [],
    methods: {
      getAskLeaveList () {
        this.$http.get(URL_GET_ADMIN_ASK_LEAVE)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message(response.body.msg)
              return
            }
            // 请求成功
            this.askLeaveList = AskLeave.parseAskLeaveList(response.body.askLeaveList)
          }, response => {
            this.$message('请假审批列表获取失败')
          })
      },
      handleDetail (rowIndex, data) {
        let tabName = ''
        if (data.state === AskLeave.STATE_APPROVED) {
          tabName = AskLeaveDetail.name
        } else {
          tabName = AskLeaveAdminDetail.name
        }
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('审核请假', tabName, data))
      }
    },
    computed: {},
    created: function () {
      this.getAskLeaveList()
      // 注册监听事件
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getAskLeaveList()
      })
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ASK_LEAVE, () => {
        this.getAskLeaveList()
      })
    }
  }
</script>

<style>

</style>
