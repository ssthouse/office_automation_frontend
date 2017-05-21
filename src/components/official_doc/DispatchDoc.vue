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
          <el-row style="margin-top: -5px;">
            <div style="margin-right: 20px; float: left;">
              <el-input placeholder="标题"
                        style="float: left; margin-right: 100px;"
                        class="form-item-content"
                        v-model="dispatch.title"></el-input>

            </div>
            <div style="float: right;">
              <b style="margin-left: 20px; margin-right: 20px;">截止日期:</b>
              <el-date-picker
                style="float: right;"
                v-model="deadline"
                type="date"
                placeholder="结束日期"
                :picker-options="pickerOptionsStartDate">
              </el-date-picker>
            </div>
          </el-row>

        </el-form-item>
        <!--targetOrganization-->
        <el-form-item label="主送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      @focus="onClickTargetOrganization()"
                      v-model="dispatch.targetOrganization"></el-input>
          </div>
        </el-form-item>
        <!--copyToOrganization-->
        <el-form-item label="抄送单位:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      @focus="onClickCopyToOrganization()"
                      v-model="dispatch.copyToOrganization"></el-input>
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
        <!--content-->
        <el-form-item label="正文:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      type="textarea"
                      style="float: left; width: 60%"
                      v-model="dispatch.content"></el-input>

            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="dispatch.executors"></el-input>
          </div>
        </el-form-item>
        <!--check-->
        <el-form-item label="核稿:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="checkDisabled"
                      style="float: left; width: 60%"
                      v-model="dispatch.checkComment"></el-input>

            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      :disabled="checkDisabled"
                      v-if="!checkDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="dispatch.executors"></el-input>
          </div>
        </el-form-item>
        <!--countersign-->
        <el-form-item label="会签:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      :disabled="countersignDisabled"
                      style="float: left; width: 60%"
                      v-model="dispatch.countersign"></el-input>

            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      :disabled="countersignDisabled"
                      v-if="!countersignDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="dispatch.executors"></el-input>
          </div>
        </el-form-item>
        <!--sign-->
        <el-form-item label="签发:"
                      class="form-item">
          <div style="margin-right: 20px;">
            <el-input class="form-item-content"
                      style="float: left; width: 60%"
                      :disabled="signDisabled"
                      v-model="dispatch.sign"></el-input>

            <el-input class="form-item-content"
                      style="width: 30%; float: right;"
                      :disabled="signDisabled"
                      v-if="!signDisabled"
                      placeholder="下一步执行人"
                      @focus="onClickChooseUser()"
                      v-model="dispatch.executors"></el-input>
          </div>
        </el-form-item>
        <!--起始日期 deadline-->
        <el-form-item label="发文日期:"
                      style="visibility: collapse"
                      class="form-item">
          <div class="form-item-content">
            <el-date-picker
              v-model="dispatch.beginDate"
              type="date"
              :disabled="true"
              placeholder="起始日期"
              :picker-options="pickerOptionsStartDate">
            </el-date-picker>
          </div>
        </el-form-item>
        <!--<hr/>-->

        <!--&lt;!&ndash;下一步的选择&ndash;&gt;-->
        <!--<el-form-item label="下一步:"-->
        <!--style="margin-top: -50px;"-->
        <!--class="form-item">-->
        <!--<div class="form-item-content"-->
        <!--style="margin-top: 8px;">-->
        <!--<el-radio-group v-model="nextState"-->
        <!--style="float: left;">-->
        <!--<el-radio label="begin">发文该稿-->
        <!--</el-radio>-->
        <!--<el-radio label="finish">结束-->
        <!--</el-radio>-->
        <!--</el-radio-group>-->
        <!--</div>-->
        <!--</el-form-item>-->
        <!--<hr/>-->

        <!--提交按钮-->
        <div>
          <el-button type="primary"
                     style="width: 100px; margin-top: -60px;"
                     :disabled="isFinished"
                     @click="onClickSubmit()">提交
          </el-button>
        </div>
      </el-form>
    </el-card>

    <!--主送单位dialog-->
    <choose-department-dialog :showDialog="showTargetOrganizationDialog"
                              @cancel="showTargetOrganizationDialog = false"
                              @ensure="onEnsureTargetOrganization">
    </choose-department-dialog>

    <!--抄送单位dialog-->
    <choose-department-dialog :showDialog="showCopyToOrganizationDialog"
                              @cancel="showCopyToOrganizationDialog = false"
                              @ensure="onEnsureCopyToOrganization">
    </choose-department-dialog>

    <!--选择用户dialog-->
    <choose-user-dialog v-bind:showDialog="showChooseUserDialog"
                        @cancel="showChooseUserDialog = false"
                        @ensure="onEnsureChooseUser"></choose-user-dialog>
  </div>
</template>

<script>
  import Dispatch from './bean/dispatch'
  import * as Cons from '../base/Constant'
  import * as EventBus from '../base/EventBus'

  export default{
    name: 'dispatch-doc',
    data () {
      return {
        dispatch: '',
        deadline: new Date(),
        typeOptions: Dispatch.Type,
        isFinished: false,
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        showTargetOrganizationDialog: false,
        showCopyToOrganizationDialog: false,
        showChooseUserDialog: false
      }
    },
    props: ['data'],
    methods: {
      onClickChooseUser () {
        this.showChooseUserDialog = true
      },
      onEnsureChooseUser (userList) {
        this.dispatch.executors = userList
        this.showChooseUserDialog = false
      },
      onEnsureTargetOrganization (targetDepartmentList) {
        this.showTargetOrganizationDialog = false
        // 刷新数据
        let targetOrganization = []
        for (let department of targetDepartmentList) {
          targetOrganization.push(department.name)
        }
        this.dispatch.targetOrganization = targetOrganization.join(',')
      },
      onEnsureCopyToOrganization (copyToDepartmentList) {
        this.showCopyToOrganizationDialog = false
        // 刷新数据
        let copyToOrganization = []
        for (let department of copyToDepartmentList) {
          copyToOrganization.push(department.name)
        }
        this.dispatch.copyToOrganization = copyToOrganization.join(',')
      },
      onClickTargetOrganization () {
        this.showTargetOrganizationDialog = true
      },
      onClickCopyToOrganization () {
        this.showCopyToOrganizationDialog = true
      },
      onClickSubmit () {
        this.dispatch.deadline = this.deadline.getTime()
        console.log(JSON.stringify(this.dispatch))
        if (!this.isFormValid()) {
          this.$message('数据不完整')
          return
        }
        this.postNewDispatch()
      },
      isFormValid () {
        return this.dispatch.isValid()
      },
      postNewDispatch () {
        this.$http.post(Cons.BASE_URL + '/dispatch/new', this.dispatch)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败: ' + this.body.msg)
              return
            }
            this.$message('提交成功')
            EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH)
            this.isFinished = true
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
