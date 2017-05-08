<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <el-form label-width="80px" label-position="right">
        <!--type-->
        <el-form-item label="公文类型:">
          <el-select v-model="dispatch.type"
                     class="form-item-content">
            <el-option v-for="option in typeOptions"
                       :label="option"
                       :value="option"></el-option>
          </el-select>
        </el-form-item>
        <!--title-->
        <el-form-item label="标题:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input placeholder="标题"
                      class="form-item-content"
                      v-model="dispatch.title"></el-input>
          </div>
        </el-form-item>
        <!--targetOrganization-->
        <el-form-item label="主送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="dispatch.targetOrganization"></el-input>
          </div>
        </el-form-item>
        <!--copyToOrganization-->
        <el-form-item label="抄送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="dispatch.copyToOrganization"></el-input>
          </div>
        </el-form-item>
        <!--content-->
        <el-form-item label="正文:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="dispatch.content"></el-input>
          </div>
        </el-form-item>
        <!--owner-->
        <el-form-item label="拟稿人:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="true"
                      v-model="dispatch.owner"></el-input>
          </div>
        </el-form-item>
        <!--check-->
        <el-form-item label="核稿:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="checkDisabled"
                      v-model="dispatch.checkComment"></el-input>
          </div>
        </el-form-item>
        <!--countersign-->
        <el-form-item label="会签:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="countersignDisabled"
                      v-model="dispatch.countersign"></el-input>
          </div>
        </el-form-item>
        <!--sign-->
        <el-form-item label="签发:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="signDisabled"
                      v-model="dispatch.sign"></el-input>
          </div>
        </el-form-item>
        <!--起始日期 deadline-->
        <el-form-item label="发文日期:"
                      class="form-item">
          <div class="form-item-content">
            <el-date-picker
              v-model="dispatch.beginDate"
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
        <el-form-item label="下一步:"
                      class="form-item">
          <div class="form-item-content"
               style="margin-top: 8px;">
            <el-radio-group v-model="nextState"
                            style="float: left;">
              <el-radio label="begin">发文该稿
              </el-radio>
              <el-radio label="finish">结束
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <!--任务执行人-->
        <el-form-item label="执行人:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      v-model="dispatch.executors"></el-input>
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
  import Dispatch from './bean/dispatch'
  import Utils from '../base/Utils'
  import * as Cons from '../base/Constant'

  export default{
    name: 'dispatch-doc',
    data () {
      return {
        dispatch: '',
        nextState: '',
        deadline: new Date(),
        typeOptions: Dispatch.Type,
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
        this.dispatch.deadline = this.deadline.getTime()
        console.log(JSON.stringify(this.dispatch))
        if (!this.isFormValid()) {
          this.$message('数据不完整')
          return
        }
        this.postNewDispatch()
      },
      onClickCancel () {

      },
      isFormValid () {
        if (Utils.isStrEmpty(this.nextState)) {
          return false
        }
        if (!this.dispatch.isValid()) {
          return false
        }
        return true
      },
      postNewDispatch () {
        this.$http.post(Cons.BASE_URL + '/dispatch/new', this.dispatch)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + this.body.msg)
              return
            }
            this.$message('提交成功')
          }, response => {
            this.$message('提交失败')
          })
      }
    },
    computed: {
      checkDisabled () {
        if (this.dispatch.state === Dispatch.STATE_CHECK) {
          return false
        } else {
          return true
        }
      },
      countersignDisabled () {
        if (this.dispatch.state === Dispatch.STATE_COUNTERSIGN) {
          return false
        } else {
          return true
        }
      },
      signDisabled () {
        if (this.dispatch.state === Dispatch.STATE_SIGN) {
          return false
        } else {
          return true
        }
      }
    },
    created: function () {
      if (this.data === null || this.data === undefined) {
        this.dispatch = Dispatch.emptyInstance()
      } else {
        this.dispatch = this.data
      }
      // initial owner data
      this.dispatch.owner = this.$store.state.mainModule.user.username
    }
  }
</script>

<style>

</style>
