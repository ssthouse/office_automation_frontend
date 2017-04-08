<template>
  <div>
    <el-card style="margin-left: 20px; margin-right: 20px;">
      <div slot="header">
        <h4>详细信息</h4>
      </div>
      <table class="table table-bordered"
             border="1">
        <tbody>
        <tr class="hide">
          <th colspan="6" class="text-center">请假单</th>
        </tr>
        <tr>
          <td width="72">姓名</td>
          <td width="62">李白</td>
          <td width="70">部门</td>
          <td width="77">行政部</td>
          <td width="80">职位</td>
          <td width="93">部门经理</td>
        </tr>
        <tr>
          <td>类型</td>
          <td colspan="5">{{askLeave.leaveType}}</td>
        </tr>
        <tr>
          <td>事由</td>
          <td colspan="5">{{askLeave.description}}</td>
        </tr>
        <tr>
          <td>日期</td>
          <td colspan="5">{{askLeave.beginDate}} 至 {{askLeave.endDate}}</td>
        </tr>
        <tr>
          <td>天数</td>
          <td colspan="5">{{askLeave.dayNum}}</td>
        </tr>
        <tr>
          <td>审核人</td>
          <td colspan="5">{{askLeave.approverUsername}}</td>
        </tr>
        </tbody>
      </table>
      <hr/>

      <h4>审核情况</h4>
      <p style="margin-top: 20px;">{{getAskLeaveStateDescription()}}</p>
      <hr/>

      <el-button-group>
        <el-button @click="onClickApprove()"
                   :disabled="isFinished">同意
        </el-button>
        <el-button @click="onClickDecline"
                   :disabled="isFinished">不同意
        </el-button>
      </el-button-group>
    </el-card>

  </div>

</template>

<script>
  import AskLeave from './bean/askLeave'
  import * as Cons from '../../base/Constant'

  const URL_POST_UPDATE_ASK_LEAVE = Cons.BASE_URL + '/ask_leave/update'

  export default{
    name: 'ask-leave-admin-detail',
    data () {
      return {
        askLeave: this.data,
        isFinished: false
      }
    },
    props: ['data'],
    methods: {
      getAskLeaveStateDescription () {
        switch (this.askLeave.state) {
          case AskLeave.LEAVE_STATE_DRAFT:
            return '尚未提交申请, 处于草稿状态'
          case AskLeave.LEAVE_STATE_UNAPPROVED:
            return '尚未通过审核'
          case AskLeave.LEAVE_STATE_APPROVED:
            return '已通过审核'
          case AskLeave.LEAVE_STATE_DECLINE:
            return '审核已被拒绝'
          default:
            return '审核状态不合法'
        }
      },
      onClickApprove () {
        this.askLeave.state = AskLeave.LEAVE_STATE_APPROVED
        this.postAskLeaveUpdate()
      },
      onClickDecline () {
        this.askLeave.state = AskLeave.LEAVE_STATE_DECLINE
        this.postAskLeaveUpdate()
      },
      postAskLeaveUpdate () {
        this.$http.post(URL_POST_UPDATE_ASK_LEAVE, JSON.stringify(this.askLeave))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('更新失败')
              return
            }
            this.$message('更新状态成功')
            this.isFinished = true
          }, response => {
            this.$message('更新失败')
          })
      }
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>
</style>
