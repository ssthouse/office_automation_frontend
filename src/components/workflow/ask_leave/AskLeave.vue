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
                      :disabled="true"
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
                      @focus="onClickChooseUser()"
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

    <!--选择用户dialog-->
    <choose-user-dialog v-bind:showDialog="showDialog"
                        @cancel="showDialog = false"
                        @ensure="onEnsureChooseUser"></choose-user-dialog>
  </div>
</template>

<script>
  import AskLeave from './bean/askLeave'
  import * as Cons from '../../base/Constant'
  import Utils from '../../base/Utils'

  const URL_POST_NEW_ASK_LEAVE = Cons.BASE_URL + '/ask_leave/new'
  const URL_POST_UPDATE_ASK_LEAVE = Cons.BASE_URL + '/ask_leave/update'

  // eventbus
  import * as EventBus from '../../base/EventBus'

  export default{
    name: 'ask-leave',
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
        showDialog: false,
        isFinished: false
      }
    },
    props: ['data'],
    methods: {
      onClickChooseUser () {
        this.showDialog = true
      },
      onEnsureChooseUser (userList) {
        console.log(userList)
        this.showDialog = false
      },
      fillInOutingData () {
        // 格式化时间字符串
        this.askLeave.beginDate = Utils.getFormatDateStr(this.beginDate)
        this.askLeave.endDate = Utils.getFormatDateStr(this.endDate)
        // 填充username
        this.askLeave.username = this.$store.state.mainModule.user.username
      },
      // 直接提交为待审核
      onClickSaveAsUnapproved () {
        this.fillInOutingData()
        if (this.askLeave.isValid() !== true) {
          this.$message('表单信息不完整')
          return
        }
        this.askLeave.state = AskLeave.STATE_UNAPPROVED
        this.postAskLeave()
      },
      // 保存为草稿
      onClickSaveAsDraft () {
        this.fillInOutingData()
        if (this.askLeave.isValid() !== true) {
          this.$message('表单信息不完整')
          return
        }
        this.askLeave.state = AskLeave.STATE_DRAFT
        this.postAskLeave()
      },
      postAskLeave () {
        let url = ''
        if (this.askLeave.id !== undefined && this.askLeave.id > 0) {
          url = URL_POST_UPDATE_ASK_LEAVE
        } else {
          url = URL_POST_NEW_ASK_LEAVE
        }
        this.$http.post(url, JSON.stringify(this.askLeave))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + response.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
            EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_ASK_LEAVE)
          }, response => {
            this.$message('提交失败: 请稍后重试')
          })
      },
      updateDayNum () {
        if (this.beginDate === '' ||
          this.beginDate === undefined ||
          this.endDate === '' ||
          this.endDate === undefined) {
          return
        }
        this.askLeave.dayNum = (this.endDate.getTime() - this.beginDate.getTime()) / (24 * 60 * 60 * 1000) + 1
      }
    },
    computed: {},
    created: function () {
      // means to create a new askLeave
      if (this.data === null) {
        return
      }
      this.askLeave = this.data
      // 将日期解析到UI
      this.beginDate = new Date(this.askLeave.beginDate)
      this.endDate = new Date(this.askLeave.endDate)
    },
    watch: {
      beginDate: function () {
        console.log(this.beginDate)
        this.updateDayNum()
      },
      endDate: function () {
        this.updateDayNum()
      }
    }
  }
</script>

<style>
  .form-item-content {
    float: left;
    margin-left: 20px;
  }
</style>
