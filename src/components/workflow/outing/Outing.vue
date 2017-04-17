<template>
  <!--/**-->
  <!--{-->
  <!--"id": 1,-->
  <!--"destination": "ShangHai",-->
  <!--"beginDate": "2017-11-11",-->
  <!--"endDate": "2017-11-11",-->
  <!--"dayNum": 1,-->
  <!--"description": "des",-->
  <!--"username": "ssthouse",-->
  <!--"approverUsername": "ssthouse",-->
  <!--"state": "begin"-->
  <!--}-->
  <!--*/-->
  <div>
    <div style="margin-left: 20px; margin-right: 20px;">
      <el-alert type="info"
                title="注意! 出差单状态为正常后(可在列表操作中设置为“正常”)，就不能再编辑！后续流程等待审批人操作。">
      </el-alert>
    </div>

    <el-card :span="24"
             style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">

      <div slot="header">
        <span>详细信息</span>
      </div>

      <el-form label-width="80px"
               label-position="right">
        <!--请假的类型-->
        <el-form-item label="类型">
          <el-input v-model="outing.destination"
                    placeholder="目的地"
                    class="form-item-content">
          </el-input>
        </el-form-item>
        <!--请假的 起始 结束日期-->
        <el-form-item label="请假日期">
          <div class="form-item-content">
            <el-date-picker
              v-model="beginDate"
              type="date"
              placeholder="起始日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
            <span style="margin-left: 20px; margin-right: 20px;">-</span>
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="结束日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
          </div>
        </el-form-item>
        <!--请假天数-->
        <el-form-item label="请假天数">
          <div style="margin-left: 20px;">
            <el-input v-model="outing.dayNum"
                      placeholder="请输入数字"
                      style="clear: both; margin-right: 20px;"></el-input>
          </div>
        </el-form-item>
        <!--请假事由-->
        <el-form-item label="请假事由">
          <div style="margin-left: 20px;">
            <el-input type="textarea" v-model="outing.description">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="审批人">
          <div style="margin-left: 20px;">
            <el-input v-model="outing.approverUsername"
                      placeholder="请输入审批人id"
                      style="float: left;"></el-input>
            <el-button style="float: right; margin-top: 5px;">查找审批人</el-button>
          </div>
        </el-form-item>

        <div>
          <el-button type="primary"
                     :disabled="isFinished"
                     @click="onClickSaveAsDraft()">保存草稿
          </el-button>
          <el-button type="primary"
                     style="margin-left: 60px;"
                     :disabled="isFinished"
                     @click="onClickSaveAsUnapproved()">提交申请
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import Outing from './bean/outing'
  import Utils from '../../base/Utils'
  import * as Cons from '../../base/Constant'
  import * as EventBus from '../../base/EventBus'

  const URL_POST_UPDATE_OUTING = Cons.BASE_URL + '/outing/update'
  const URL_POST_NEW_OUTING = Cons.BASE_URL + '/outing/new'

  export default{
    name: 'outing',
    data () {
      return {
        outing: new Outing(),
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isFinished: false,
        beginDate: '',
        endDate: ''
      }
    },
    props: ['data'],
    methods: {
      fillInOutingData () {
        // 格式化时间字符串
        this.outing.beginDate = Utils.getFormatDateStr(this.beginDate)
        this.outing.endDate = Utils.getFormatDateStr(this.endDate)
        // 填充username
        this.outing.username = this.$store.state.mainModule.user.username
      },
      // 直接提交为待审核
      onClickSaveAsUnapproved () {
        this.fillInOutingData()
        if (this.outing.isValid() !== true) {
          this.$message('表单信息不完整')
          return
        }
        this.outing.state = Outing.STATE_UNAPPROVED
        this.postOuting()
      },
      // 保存为草稿
      onClickSaveAsDraft () {
        this.fillInOutingData()
        if (this.outing.isValid() !== true) {
          this.$message('表单信息不完整')
          return
        }
        this.outing.state = Outing.STATE_DRAFT
        this.postOuting()
      },
      postOuting () {
        let url = ''
        if (this.outing.id !== undefined && this.outing.id > 0) {
          url = URL_POST_UPDATE_OUTING
        } else {
          url = URL_POST_NEW_OUTING
        }
        this.$http.post(url, JSON.stringify(this.outing))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + response.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
            EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_OUTING)
          }, response => {
            this.$message('提交失败: 请稍后重试')
          })
      }
    },
    computed: {},
    created: function () {
      // means to create a new outing
      if (this.data === null) {
        return
      }
      this.outing = this.data
      // 将日期解析到UI
      this.beginDate = new Date(this.outing.beginDate)
      this.endDate = new Date(this.outing.endDate)
    }
  }
</script>

<style>

</style>
