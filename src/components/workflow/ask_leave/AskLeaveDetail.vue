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
          <td width="62">{{askLeave.username}}</td>
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
    </el-card>

  </div>

</template>

<script>
  import Utils from '../../base/Utils'

  export default{
    name: 'ask-leave-detail',
    data () {
      return {
        askLeave: this.data
      }
    },
    props: ['data'],
    methods: {
      getAskLeaveStateDescription () {
        return Utils.getStateDescription(this.askLeave.state)
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>
</style>
