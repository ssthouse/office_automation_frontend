<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <el-form label-width="80px" label-position="right">
        <!--type-->
        <el-form-item label="公文类型:">
          <el-select v-model="incoming.type"
                     class="form-item-content">
            <el-option v-for="option in typeOptions"
                       :label="option"
                       :value="option"></el-option>
          </el-select>
        </el-form-item>
        <!--title-->
        <el-form-item label="标题:">
          <div style="margin-right: 20px;">
            <el-input placeholder="标题"
                      class="form-item-content"
                      v-model="incoming.title"></el-input>
          </div>
        </el-form-item>
        <!--targetOrganization-->
        <el-form-item label="主送单位:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="incoming.targetOrganization"></el-input>
          </div>
        </el-form-item>
        <!--copyToOrganization-->
        <el-form-item label="抄送单位:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="incoming.copyToOrganization"></el-input>
          </div>
        </el-form-item>
        <!--content-->
        <el-form-item label="正文:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      type="textarea"
                      v-model="incoming.content"></el-input>
          </div>
        </el-form-item>
        <!--owner-->
        <el-form-item label="拟稿人:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="true"
                      v-model="incoming.owner"></el-input>
          </div>
        </el-form-item>
        <!--check-->
        <el-form-item label="拟办:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="proposeDisabled"
                      v-model="incoming.propose"></el-input>
          </div>
        </el-form-item>
        <!--countersign-->
        <el-form-item label="批办:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="approveDisabled"
                      v-model="incoming.approve"></el-input>
          </div>
        </el-form-item>
        <!--sign-->
        <el-form-item label="办理:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="dealDisabled"
                      v-model="incoming.deal"></el-input>
          </div>
        </el-form-item>
        <!--起始日期 deadline-->
        <el-form-item label="发文日期:">
          <div class="form-item-content">
            <el-date-picker
              v-model="incoming.beginDate"
              type="date"
              :disabled="true"
              placeholder="起始日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
            <b style="margin-left: 20px; margin-right: 20px;">截止日期:</b>
            <el-date-picker
              v-model="deadline"
              type="date"
              placeholder="结束日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
          </div>
        </el-form-item>
        <hr/>

        <!--下一步的选择-->
        <el-form-item label="下一步:">
          <div class="form-item-content"
               style="margin-top: 8px;">
            <el-radio-group v-model="nextState"
                            style="float: left;">
              <el-radio label="begin">办公室拟办
              </el-radio>
              <el-radio label="finish">结束
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <!--任务执行人-->
        <el-form-item label="执行人:">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="incoming.executors"></el-input>
          </div>
        </el-form-item>
        <hr/>

        <!--提交按钮-->
        <div>
          <el-button type="primary"
                     :disabled="isFinished"
                     @click="onClickSubmit()">提交
          </el-button>
          <el-button type="primary"
                     style="margin-left: 60px;"
                     :disabled="isFinished"
                     @click="onClickCancel()">取消
          </el-button>
        </div>
      </el-form>
    </el-card>

  </div>
</template>

<script>
  import Incoming from './bean/incoming'
  import Utils from '../base/Utils'
  import * as Cons from '../base/Constant'

  export default{
    name: 'incoming-doc',
    data () {
      return {
        incoming: '',
        deadline: new Date(),
        nextState: '',
        typeOptions: Incoming.Type,
        isFinished: false,
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    },
    props: ['data'],
    methods: {
      onClickSubmit () {
        this.incoming.deadline = this.deadline.getTime()
        console.log(JSON.stringify(this.incoming))
        if (!this.isFormValid()) {
          this.$message('数据不完整')
          return
        }
        this.postNewIncoming()
      },
      onClickCancel () {},
      isFormValid () {
        if (Utils.isStrEmpty(this.nextState)) {
          return false
        }
        if (!this.incoming.isValid()) {
          return false
        }
        return true
      },
      postNewIncoming () {
        this.$http.post(Cons.BASE_URL + '/incoming/new', this.incoming)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + response.body.msg)
              return
            }
            this.$message('提交成功')
          }, response => {
            this.$message('提交失败')
          })
      }
    },
    computed: {
      proposeDisabled () {
        if (this.incoming.state === Incoming.STATE_PROPOSE) {
          return false
        } else {
          return true
        }
      },
      approveDisabled () {
        if (this.incoming.state === Incoming.STATE_APPROVE) {
          return false
        } else {
          return true
        }
      },
      dealDisabled () {
        if (this.incoming.state === Incoming.STATE_DEAL) {
          return false
        } else {
          return true
        }
      }
    },
    created: function () {
      if (this.data === null || this.data === undefined) {
        this.incoming = Incoming.emptyInstance()
      } else {
        this.incoming = this.data
      }
      // initial owner data
      this.incoming.owner = this.$store.state.mainModule.user.username
    }
  }
</script>

<style>

</style>
