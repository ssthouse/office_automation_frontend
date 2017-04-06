<template>
  <div>
    <div style="margin-left: 20px; margin-right: 20px;">
      <el-alert type="info"
                title="注意! 请假单状态为正常后(可在列表操作中设置为“正常”)，就不能再编辑！后续流程等待审批人操作。">
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
          <el-select v-model="askLeave.leaveType"
                     placeholder="请选择"
                     class="form-item-content">
            <el-option
              v-for="item in leaveTypeOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
            <el-input v-model="askLeave.dayNum"
                      placeholder="请输入数字"
                      style="clear: both; margin-right: 20px;"></el-input>
          </div>
        </el-form-item>
        <!--请假事由-->
        <el-form-item label="请假事由">
          <div style="margin-left: 20px;">
            <el-input type="textarea" v-model="askLeave.description">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="审批人">
          <div style="margin-left: 20px;">
            <el-input v-model="askLeave.approverUsername"
                      placeholder="请输入审批人id"
                      style="float: left;"></el-input>
            <el-button style="float: right; margin-top: 5px;">查找审批人</el-button>
          </div>
        </el-form-item>

        <el-button type="primary"
                   :disabled="isFinished"
                   @click="submit()">提交申请
        </el-button>
      </el-form>

    </el-card>

  </div>
</template>

<script>
  import AskLeave from './bean/askLeave'

  const URL_POST_NEW_ASK_LEAVE = 'http://127.0.0.1:8080/office_automation_backend/ask_leave/new'

  export default{
    name: 'new-ask-leave',
    data () {
      return {
        askLeave: new AskLeave(),
        beginDate: '',
        endDate: '',
        leaveTypeOptions: [{
          value: '事假',
          label: '事假'
        }, {
          value: '病假',
          label: '病假'
        }, {
          value: '年假',
          label: '年假'
        }, {
          value: '调休',
          label: '调休'
        }, {
          value: '婚假',
          label: '婚假'
        }, {
          value: '产假',
          label: '产假'
        }],
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        isFinished: false
      }
    },
    props: [],
    methods: {
      getFormatDateStr (date) {
        if (date === null) {
          return ''
        }
        if (!(date instanceof Date)) {
          return ''
        }
        return date.toISOString().slice(0, 10)
      },
      submit () {
        // 格式化时间字符串
        this.askLeave.beginDate = this.getFormatDateStr(this.beginDate)
        this.askLeave.endDate = this.getFormatDateStr(this.endDate)
        // 填充username
        this.askLeave.username = this.$store.state.mainModule.user.username
        if (this.askLeave.isValid() !== true) {
          this.$message('表单信息不完整')
          return
        }
        this.postNewAskLeave()
      },
      postNewAskLeave () {
        // console.log(JSON.stringify(this.askLeave))
        this.$http.post(URL_POST_NEW_ASK_LEAVE, JSON.stringify(this.askLeave))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + response.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
          }, response => {
            this.$message('提交失败: 请稍后重试')
          })
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>
  .form-item-content {
    float: left;
    margin-left: 20px;
  }
</style>
