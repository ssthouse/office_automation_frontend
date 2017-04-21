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
  </div>
</template>

<script>
  import Utils from '../../base/Utils'
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
        showUrgeDialog: false,
        urgeDispatchIndex: 0,
        urgeShortMsg: false,
        urgeEmail: false
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
        console.log('this is the index: ' + index)
        this.showUrgeDialog = true
      },
      onClickCancel (index) {
        console.log(';;;')
      },
      onClickTransmit (index) {
        console.log(';;;')
      },
      onEnsureUrge () {
        this.$message('已发送提醒 :)')
        this.showUrgeDialog = false
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
        console.log(this.dispatchList.length + '********')
        if (this.dispatchList === null || this.dispatchList === undefined ||
          this.dispatchList.length - 1 < this.urgeDispatchIndex) {
          return ''
        }
        return '请及时办理:' + this.dispatchList[this.urgeDispatchIndex].title
      }
    },
    created: function () {
      this.fetchDispatchList()
    }
  }
</script>

<style>

</style>
