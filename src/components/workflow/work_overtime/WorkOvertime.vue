<template>
  <div>
    <div style="margin-left: 20px; margin-right: 20px;">
      <el-alert type="info"
                title="注意! 加班单状态为正常后(可在列表操作中设置为“正常”)，就不能再编辑！后续流程等待审批人操作。">
      </el-alert>
    </div>

    <el-card :span="24"
             style="margin-left: 20px; margin-right: 20px; margin-top: 20px;">

      <div slot="header">
        <span>详细信息</span>
      </div>

      <el-form label-width="100px"
               label-position="right">
        <!--请假的 起始 结束日期-->
        <el-form-item label="加班日期">
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
        <!--时候节假日-->
        <el-form-item label="法定节假日">
          <el-checkbox v-model="workOvertime.isHoliday"
                       style="margin-left: 20px; float: left;">是否为法定节假日
          </el-checkbox>
        </el-form-item>
        <!--请假天数-->
        <el-form-item label="加班时长">
          <div style="margin-left: 20px; float: left;">
            <el-input-number v-model="workOvertime.hourNum"
                             placeholder="请输入数字"
                             style="clear: both; margin-right: 20px;"></el-input-number>
          </div>
        </el-form-item>
        <!--请假事由-->
        <el-form-item label="加班事由">
          <div style="margin-left: 20px;">
            <el-input type="textarea" v-model="workOvertime.description">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="审批人">
          <div style="margin-left: 20px;">
            <el-input v-model="workOvertime.approverUsername"
                      placeholder="请输入审批人id"
                      style="float: left;"></el-input>
            <el-button style="float: right; margin-top: 5px;">查找审批人</el-button>
          </div>
        </el-form-item>
        <!--下方提交按钮-->
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
  import WorkOvertime from './bean/workOvertime'
  import * as Cons from '../../base/Constant'
  import Utils from '../../base/Utils'
  import * as EventBus from '../../base/EventBus'

  const URL_POST_WORK_OVERTIME_UPDATE = Cons.BASE_URL + '/work_overtime/update'
  const URL_POST_WORK_OVERTIME_NEW = Cons.BASE_URL + '/work_overtime/new'

  export default{
    name: 'work-overtime',
    data () {
      return {
        workOvertime: WorkOvertime.emptyInstance(),
        beginDate: '',
        endDate: '',
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isFinished: false
      }
    },
    props: ['data'],
    methods: {
      fillInOutingData () {
        // 格式化时间字符串
        this.workOvertime.beginDate = Utils.getFormatDateStr(this.beginDate)
        this.workOvertime.endDate = Utils.getFormatDateStr(this.endDate)
        // 填充username
        this.workOvertime.username = this.$store.state.mainModule.user.username
      },
      onClickSaveAsDraft () {
        this.fillInOutingData()
        if (this.workOvertime.isValid() !== true) {
          this.$message('表格数据不完整')
          return
        }
        this.workOvertime.state = WorkOvertime.STATE_DRAFT
        this.postWorkOvertime()
      },
      onClickSaveAsUnapproved () {
        this.fillInOutingData()
        if (this.workOvertime.isValid() !== true) {
          this.$message('表格数据不完整')
          return
        }
        this.workOvertime.state = WorkOvertime.STATE_UNAPPROVED
        this.postWorkOvertime()
      },
      postWorkOvertime () {
        let url = ''
        if (this.workOvertime.id !== undefined && this.workOvertime.id > 0) {
          url = URL_POST_WORK_OVERTIME_UPDATE
        } else {
          url = URL_POST_WORK_OVERTIME_NEW
        }
        this.$http.post(url, JSON.stringify(this.workOvertime))
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
      // means to create a new askLeave
      if (this.data === null || this.data === undefined) {
        return
      }
      console.log('this is the work overtime data I get')
      this.workOvertime = this.data
      // 将日期解析到UI
      this.beginDate = new Date(this.workOvertime.beginDate)
      this.endDate = new Date(this.workOvertime.endDate)
    }
  }
</script>

<style>
  .form-item-content {
    float: left;
    margin-left: 20px;
  }
</style>
