<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <el-form label-width="80px" label-position="right">
        <!--type-->
        <el-form-item label="公文类型:">
          <el-select v-model="dispatch.type"
                     :disabled="true"
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
                      :disabled="true"
                      class="form-item-content"
                      v-model="dispatch.title"></el-input>
          </div>
        </el-form-item>
        <!--targetOrganization-->
        <el-form-item label="主送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="true"
                      v-model="dispatch.targetOrganization"></el-input>
          </div>
        </el-form-item>
        <!--copyToOrganization-->
        <el-form-item label="抄送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="true"
                      v-model="dispatch.copyToOrganization"></el-input>
          </div>
        </el-form-item>

        <!--owner-->
        <el-form-item label="拟稿人:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="true"
                      style="width: 50%;"
                      v-model="dispatch.owner"></el-input>

            <b style="margin-left: 20px; margin-right: 20px;">截止日期:</b>
            <el-date-picker
              v-model="deadline"
              type="date"
              :disabled="true"
              placeholder="结束日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
          </div>
        </el-form-item>

        <!--content-->
        <el-form-item label="正文:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      type="textarea"
                      :disabled="true"
                      v-model="dispatch.content"></el-input>
          </div>
        </el-form-item>

        <!--check-->
        <el-form-item label="核稿:"
                      class="form-item"
                      style="margin-top: -10px;">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      style="width: 50%;"
                      :disabled="checkDisabled"
                      v-model="dispatch.checkComment"></el-input>

            <b style="margin-left: 20px; margin-right: 20px;"
               v-if="!checkDisabled">下一步执行人:</b>
            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      v-if="!checkDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="executors"></el-input>
          </div>
        </el-form-item>
        <!--countersign-->
        <el-form-item label="会签:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      style="width: 50%;"
                      :disabled="countersignDisabled"
                      v-model="dispatch.countersign"></el-input>

            <b style="margin-left: 20px; margin-right: 20px;"
               v-if="!countersignDisabled">下一步执行人:</b>
            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      v-if="!countersignDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="executors"></el-input>
          </div>
        </el-form-item>
        <!--sign-->
        <el-form-item label="签发:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="signDisabled"
                      style="width: 50%;"
                      v-model="dispatch.sign"></el-input>

            <b style="margin-left: 20px; margin-right: 20px;"
               v-if="!signDisabled">下一步执行人:</b>
            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      v-if="!signDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="executors"></el-input>
          </div>
        </el-form-item>

        <!--&lt;!&ndash;任务执行人&ndash;&gt;-->
        <!--<el-form-item label="执行人:"-->
        <!--class="form-item">-->
        <!--<div style="margin-right: 20px;">-->
        <!--<el-input class="form-item-content"-->
        <!--v-model="dispatch.executors"></el-input>-->
        <!--</div>-->
        <!--</el-form-item>-->
        <hr/>

        <!--提交按钮-->
        <div>
          <el-button type="primary"
                     :disabled="isFinished"
                     style="width: 100px;"
                     @click="onClickSubmit()">提交
          </el-button>
        </div>
      </el-form>
    </el-card>

    <!--选择用户dialog-->
    <choose-user-dialog v-bind:showDialog="showChooseUserDialog"
                        @cancel="showChooseUserDialog = false"
                        @ensure="onEnsureChooseUser"></choose-user-dialog>
  </div>
</template>

<script>
  import Dispatch from './bean/dispatch'
  import Utils from '../base/Utils'
  import * as Cons from '../base/Constant'
  import * as EventBus from '../base/EventBus'

  export default{
    name: 'deal-dispatch',
    data () {
      return {
        dispatch: this.data,
        nextState: '',
        // 用于保存下一步处理人, 否则会直接显示上一步的执行人
        executors: '',
        deadline: new Date(),
        typeOptions: Dispatch.Type,
        isFinished: false,
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        // 显示dialog的bool量
        showChooseUserDialog: false
      }
    },
    props: ['data'],
    methods: {
      onClickChooseUser () {
        this.showChooseUserDialog = true
      },
      onEnsureChooseUser (userList) {
        this.executors = userList
        this.showChooseUserDialog = false
      },
      onClickSubmit () {
        // 填充下一状态 填充处理人
        this.dispatch.state = this.getNextState()
        this.dispatch.executors = this.executors
        // console.log(JSON.stringify(this.dispatch))
        this.postUpdateDispatch()
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
      postUpdateDispatch () {
        this.$http.post(Cons.BASE_URL + '/dispatch/update', this.dispatch)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + this.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
            EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH)
          }, response => {
            this.$message('提交失败')
          })
      },
      getNextState () {
        let curState = this.dispatch.state
        let nextState = curState
        switch (curState) {
          case Dispatch.STATE_BEGIN:
            nextState = Dispatch.STATE_CHECK
            break
          case Dispatch.STATE_CHECK:
            nextState = Dispatch.STATE_COUNTERSIGN
            break
          case Dispatch.STATE_COUNTERSIGN:
            nextState = Dispatch.STATE_SIGN
            break
          case Dispatch.STATE_SIGN:
            nextState = Dispatch.STATE_FINISH
            break
        }
        return nextState
      },
      getNextStepStr () {
        let nextState = this.getNextState()
        switch (nextState) {
          case Dispatch.STATE_CHECK:
            return '发文会签'
          case Dispatch.STATE_COUNTERSIGN:
            return '发文签发'
          case Dispatch.STATE_SIGN:
            return '结束'
        }
      }
    },
    computed: {
      checkDisabled () {
        if (this.getNextState() === Dispatch.STATE_CHECK) {
          return false
        } else {
          return true
        }
      },
      countersignDisabled () {
        if (this.getNextState() === Dispatch.STATE_COUNTERSIGN) {
          return false
        } else {
          return true
        }
      },
      signDisabled () {
        if (this.getNextState() === Dispatch.STATE_SIGN) {
          return false
        } else {
          return true
        }
      }
    },
    created: function () {
      this.dispatch.owner = this.$store.state.mainModule.user.username
      this.deadline = new Date(this.dispatch.deadline)
      console.log(this.dispatch)
    }
  }
</script>

<style>
  .form-item {
    margin-top: -20px;
  }
</style>
