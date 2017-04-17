<template>
  <div>
    <el-card style="margin-left: 20px; margin-right: 20px;">
      <div slot="header">
        <h4>详细信息</h4>
      </div>
      <table class="table table-bordered" border="1">
        <tbody>
        <tr class="hide">
          <th colspan="6" class="text-center">加班单</th>
        </tr>
        <tr>
          <td width="72">姓名</td>
          <td width="62">{{workOvertime.username}}</td>
          <td width="70">部门</td>
          <td width="77">行政部</td>
          <td width="80">职位</td>
          <td width="93">部门经理</td>
        </tr>
        <tr>
          <td>法定假日</td>
          <td colspan="5">{{getIsHoliday()}}</td>
        </tr>
        <tr>
          <td>事由</td>
          <td colspan="5">{{workOvertime.description}}</td>
        </tr>
        <tr>
          <td>加班日期</td>
          <td colspan="5">{{workOvertime.beginDate}} 至 {{workOvertime.endDate}}</td>
        </tr>
        <tr>
          <td>时长</td>
          <td colspan="5">{{workOvertime.hourNum}}小时</td>
        </tr>
        <tr class="hide">
          <td>审核人</td>
          <td colspan="5">{{workOvertime.approverUsername}}</td>
        </tr>
        </tbody>
      </table>
      <hr/>

      <h4 style="margin-bottom: 20px;">审核情况</h4>
      <p>{{getWorkOvertimeState()}}</p>
      <hr/>

      <el-button-group>
        <el-button @click="onClickApprove()"
                   :disabled="isFinished">同意
        </el-button>
        <el-button @click="onClickDecline()"
                   :disabled="isFinished">不同意
        </el-button>
      </el-button-group>
    </el-card>

  </div>
</template>

<script>
  import WorkOvertime from './bean/workOvertime'
  import * as Cons from '../../base/Constant'
  import * as EventBus from '../../base/EventBus'

  const URL_POST_UPDATE_WORK_OVERTIME = Cons.BASE_URL + '/work_overtime/update'

  export default{
    name: 'work-overtime-admin-detail',
    data () {
      return {
        workOvertime: this.data,
        isFinished: false
      }
    },
    props: ['data'],
    methods: {
      getWorkOvertimeState () {
        switch (this.workOvertime.state) {
          case WorkOvertime.STATE_DRAFT:
            return '尚未提交'
          case WorkOvertime.STATE_UNAPPROVED:
            return '尚未审核'
          case WorkOvertime.STATE_APPROVED:
            return '审核通过'
          case WorkOvertime.STATE_DECLINE:
            return '审核不通过'
        }
      },
      getIsHoliday () {
        if (this.workOvertime.isHoliday) {
          return '是法定节假日'
        } else {
          return '不是法定节假日'
        }
      },
      onClickApprove () {
        this.workOvertime.state = WorkOvertime.STATE_APPROVED
        this.postUpdateWorkOvertime()
      },
      onClickDecline () {
        this.workOvertime.state = WorkOvertime.STATE_DECLINE
        this.postUpdateWorkOvertime()
      },
      postUpdateWorkOvertime () {
        this.$http.post(URL_POST_UPDATE_WORK_OVERTIME, JSON.stringify(this.workOvertime))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + response.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
            EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME)
          }, response => {
            this.$message('提交失败')
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
