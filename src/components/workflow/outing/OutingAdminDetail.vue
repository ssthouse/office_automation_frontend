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
          <th colspan="6" class="text-center">出差单</th>
        </tr>
        <tr>
          <td width="72">姓名</td>
          <td width="62">{{outing.username}}</td>
          <td width="70">部门</td>
          <td width="77">行政部</td>
          <td width="80">职位</td>
          <td width="93">部门经理</td>
        </tr>
        <tr>
          <td>目的地</td>
          <td colspan="5">{{outing.destination}}</td>
        </tr>
        <tr>
          <td>事由</td>
          <td colspan="5">{{outing.description}}</td>
        </tr>
        <tr>
          <td>日期</td>
          <td colspan="5">{{outing.beginDate}} 至 {{outing.endDate}}</td>
        </tr>
        <tr>
          <td>天数</td>
          <td colspan="5">{{outing.dayNum}}</td>
        </tr>
        <tr>
          <td>审核人</td>
          <td colspan="5">{{outing.approverUsername}}</td>
        </tr>
        </tbody>
      </table>

      <hr/>

      <h4>审核情况</h4>
      <p style="margin-top: 20px;">{{getOutingStateDescription()}}</p>
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
    </el-card>

  </div>
</template>

<script>
  import Utils from '../../base/Utils'
  import * as EventBus from '../../base/EventBus'
  import * as Cons from '../../base/Constant'

  const URL_POST_UPDATE_OUTING = Cons.BASE_URL + '/outing/update'

  export default{
    name: 'outing-admin-detail',
    data () {
      return {
        outing: this.data,
        isFinished: false
      }
    },
    props: ['data'],
    methods: {
      getOutingStateDescription () {
        return Utils.getStateDescription(this.outing.state)
      },
      onClickApprove () {
        this.outing.state = Utils.STATE_APPROVED
        this.postOutingUpdate()
      },
      onClickDecline () {
        this.outing.state = Utils.STATE_DECLINE
        this.postOutingUpdate()
      },
      postOutingUpdate () {
        console.log(JSON.stringify(this.outing))
        this.$http.post(URL_POST_UPDATE_OUTING, JSON.stringify(this.outing))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('更新失败')
              return
            }
            this.$message('更新状态成功')
            this.isFinished = true
            EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_OUTING)
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
