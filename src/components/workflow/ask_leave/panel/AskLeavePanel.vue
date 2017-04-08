<template>
  <div>
    <!--需要展示的数据:-->
    <!--{-->
    <!--"id": 1,-->
    <!--"leaveType": "sick",-->
    <!--"beginDate": "2017-11-11",-->
    <!--"endDate": "2017-11-11",-->
    <!--"dayNum": 1,-->
    <!--"description": "des",-->
    <!--"username": "ssthouse",-->
    <!--"approverUsername": "ssthouse",-->
    <!--"state": "begin"-->
    <!--}-->
    <el-table
      :data="askLeaveList"
      stripe
      style="width: 100%">
      <el-table-column prop="leaveType"
                       label="类型"
                       width="100"></el-table-column>
      <el-table-column label="时间区间"
                       width="220">
        <template scope="scope">
          <span>{{scope.row.beginDate}} 至 {{scope.row.endDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="天数"
                       width="100"
                       prop="dayNum"></el-table-column>
      <el-table-column label="状态"
                       width="120"
                       prop="state"></el-table-column>
      <el-table-column label="审批人"
                       width="120"
                       prop="approverUsername"></el-table-column>
      <el-table-column label="操作"
                       width="200">
        <template scope="scope">
          <!--the two button can is able only when in unapproved || approved state-->
          <el-button
            size="small"
            @click="onClickHandleDetail(scope.$index, scope.row)">详情
          </el-button>
          <el-button
            :disabled="scope.row.state !== 'draft'"
            size="small"
            @click="onClickHandleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            :disabled="scope.row.state !== 'draft'"
            size="small"
            type="danger"
            @click="onClickHandleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as Cons from '../../../base/Constant'
  import * as MUTATION_TYPES from '../../../../store/mutation-types'
  import AskLeave from '../../ask_leave/bean/askLeave'
  import AskLeaveDetail from '../../ask_leave/AskLeaveDetail.vue'
  import AskLeaveComponent from '../../ask_leave/AskLeave.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import {EventBus} from '../../../base/EventBus'

  const URL_GET_OPEN_ASK_LEAVE = Cons.BASE_URL + '/ask_leave/open'

  export default{
    name: 'ask-leave-panel',
    data () {
      return {
        askLeaveList: []
      }
    },
    props: [],
    methods: {
      onClickHandleDetail (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('请假详情', AskLeaveDetail.name, data))
      },
      onClickHandleEdit (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('请假', AskLeaveComponent.name, data))
      },
      onClickHandleDelete (index, data) {
        this.$alert('确认删除? 此操作不可逆.', '确认操作', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.deleteAskLeave(index)
            }
          }
        })
      },
      deleteAskLeave (index) {
        this.$http.get(Cons.BASE_URL + '/ask_leave/delete', {
          params: {
            id: this.askLeaveList[index].id
          }
        }).then(response => {
          if (response.body.ok !== true) {
            this.$message(response.body.msg)
            return
          }
          this.$message('删除成功')
          this.getAskLeaveList()
        }, response => {
          this.$message('删除失败')
        })
      },
      getAskLeaveList () {
        this.$http.get(URL_GET_OPEN_ASK_LEAVE)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message(response.body.msg)
              return
            }
            // 请求成功
            this.askLeaveList = AskLeave.parseAskLeaveList(response.body.askLeaveList)
          }, response => {
            this.$message('请假审批列表获取失败')
          })
      }
    },
    computed: {},
    created: function () {
      this.getAskLeaveList()
      // 全局数据刷新
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getAskLeaveList()
      })
      // 请假审批数据刷新
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ASK_LEAVE, () => {
        this.getAskLeaveList()
      })
    }
  }
</script>

<style>

</style>
