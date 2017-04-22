<template>
  <div>
    <el-table
      stripe
      :data="dispatchList"
      style="width: 100%">
      <!--主题-->
      <el-table-column label="主题"
                       prop="title"></el-table-column>
      <!--起始日期-->
      <el-table-column label="起始日期">
        <template scope="scope">
          {{Utils.getFormatDateStrFromMillis(dispatchList[scope.$index].beginDate)}}
        </template>
      </el-table-column>
      <!--结束日期-->
      <el-table-column label="截止日期">
        <template scope="scope">
          {{Utils.getFormatDateStrFromMillis(dispatchList[scope.$index].deadline)}}
        </template>
      </el-table-column>
      <!--状态-->
      <el-table-column label="状态"
                       prop="state"></el-table-column>
      <el-table-column label="操作"
                       width="280">
        <template scope="scope">
          <el-button @click="onClickDetail(scope.$index)" size="small">查看</el-button>
          <el-button @click="onClickUrge(scope.$index)" size="small">催办</el-button>
          <el-button @click="onClickCancel(scope.$index)" size="small">作废</el-button>
          <el-button @click="onClickTransmit(scope.$index)" size="small">转办</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--催办的dialog-->
    <el-dialog title="催办内容" v-model="showUrgeDialog" size="tiny">
      <b style="margin-bottom: 20px;">{{urgeContent}}</b>
      <div style="margin-top: 20px;">
        <el-checkbox v-model="urgeShortMsg">短信提醒</el-checkbox>
        <el-checkbox v-model="urgeEmail">邮件提醒</el-checkbox>
      </div>

      <span slot="footer" class="dialog-footer">
      <el-button @click="showUrgeDialog = false">取 消</el-button>
      <el-button type="primary" @click="onEnsureUrge()">确 定</el-button>
      </span>
    </el-dialog>

    <!--转办dialog-->
    <el-dialog title="转办" v-model="showTransmitDialog">
      <el-form>
        <el-form-item v-bind:label="'原办理人: ' + executorList.join(',')">
          <el-input placeholder="请输入新的办理人"
                    v-model="newExecutors"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showTransmitDialog = false">取消</el-button>
        <el-button type="primary"
                   @click="onEnsureTransmit">确认
        </el-button>
      </div>
    </el-dialog>

    <!--作废dialog-->
    <el-dialog title="确认作废该公文?" v-model="showCancelDialog">
      <b>{{'公文标题: ' + cancelTitle}}</b>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCancelDialog = false">取消</el-button>
        <el-button type="primary"
                   @click="onEnsureCancel">确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Utils from '../../base/Utils'
  import * as EventBus from '../../base/EventBus'
  import * as Cons from '../../base/Constant'
  import TabItem from '../../base/TabItem'
  import * as MUTATIONS from '../../../store/mutation-types'
  import DispatchDetail from '../DispatchDetail.vue'
  //  import Dispatch from '../bean/dispatch'

  export default{
    name: 'official-doc-admin-panel',
    data () {
      return {
        dispatchList: [],
        Utils: Utils,
        // 催办数据
        showUrgeDialog: false,
        urgeDispatchIndex: 0,
        urgeShortMsg: false,
        urgeEmail: false,
        // 转办数据
        showTransmitDialog: false,
        transmitIndex: 0,
        newExecutors: '',
        // 作废数据
        showCancelDialog: false,
        cancelIndex: 0
      }
    },
    props: [],
    methods: {
      onClickDetail (index) {
        this.$store.commit(MUTATIONS.OFFICIAL_DOC_ADD_TAB,
          new TabItem('发文单详情', DispatchDetail.name, this.dispatchList[index]))
      },
      onClickUrge (index) {
        this.urgeDispatchIndex = index
        this.showUrgeDialog = true
      },
      onClickCancel (index) {
        this.cancelIndex = index
        this.showCancelDialog = true
      },
      onClickTransmit (index) {
        this.transmitIndex = index
        this.showTransmitDialog = true
      },
      onEnsureTransmit () {
        this.showTransmitDialog = false
        this.transmitDispatch()
      },
      onEnsureUrge () {
        this.$message('已发送提醒 :)')
        this.showUrgeDialog = false
      },
      onEnsureCancel () {
        this.showCancelDialog = false
        this.deleteDispatch(this.dispatchList[this.cancelIndex])
      },
      // 发出废除公文请求
      deleteDispatch (dispatch) {
        let url = Cons.BASE_URL + '/dispatch/delete?id=' + dispatch.id
        this.$http.delete(url)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('废除公文失败: ' + response.body.msg)
              return
            }
            this.$message('公文废除成功')
            EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH)
          }, response => {
            this.$message('废除公文失败')
          })
      },
      // 发起转办请求
      transmitDispatch () {
        let dispatch = this.dispatchList[this.transmitIndex]
        dispatch.executors = this.newExecutors
        this.$http.post(Cons.BASE_URL + '/dispatch/update', JSON.stringify(dispatch))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('转办失败: ' + response.body.msg)
              return
            }
            this.$message('转办成功')
            EventBus.instance.$emit(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH)
          }, response => {
            this.$message('转办失败')
          })
      },
      fetchDispatchList () {
        this.$http.get(Cons.BASE_URL + '/dispatch/owner')
          .then(response => {
            if (response.body.ok !== true) {
              console.log('error get user dispatch list')
              return
            }
            this.dispatchList = response.body.dispatchList
          }, response => {
            console.log('error get user dispatch list')
          })
      }
    },
    computed: {
      urgeContent () {
        if (this.dispatchList === null || this.dispatchList === undefined ||
          this.dispatchList.length - 1 < this.urgeDispatchIndex) {
          return ''
        }
        return '请及时办理:' + this.dispatchList[this.urgeDispatchIndex].title
      },
      executorList () {
        if (this.dispatchList === null || this.dispatchList === undefined ||
          this.dispatchList.length - 1 < this.transmitIndex) {
          return []
        }
        return this.dispatchList[this.transmitIndex].executors.split(',')
      },
      cancelTitle () {
        if (this.dispatchList === null || this.dispatchList === undefined ||
          this.dispatchList.length - 1 < this.cancelIndex) {
          return ''
        }
        return this.dispatchList[this.cancelIndex].title
      }
    },
    created: function () {
      this.fetchDispatchList()
      // 注册dispatch更新事件
      EventBus.instance.$on(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH, () => {
        this.fetchDispatchList()
      })
    }
  }
</script>

<style>

</style>
