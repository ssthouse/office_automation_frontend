<template>
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
    <el-table-column label="天数"
                     width="100"
                     prop="dayNum"></el-table-column>
    <el-table-column label="状态"
                     width="100"
                     prop="state"></el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
             操作
             <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="scope.$index+',detail'">详情</el-dropdown-item>
            <el-dropdown-item :command="scope.$index+',edit'">编辑</el-dropdown-item>
            <el-dropdown-item :command="scope.$index+',delete'">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import * as Cons from '../../../base/Constant'
  import * as MUTATION_TYPES from '../../../../store/mutation-types'
  import AskLeave from '../../ask_leave/bean/askLeave'
  import AskLeaveDetail from '../../ask_leave/AskLeaveDetail.vue'
  import AskLeaveComponent from '../../ask_leave/AskLeave.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import * as EventBus from '../../../base/EventBus'

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
      /**
       * the cmdStr contains index and operation str , joined by ','
       * @param cmdStr
       */
      handleCommand (cmdStr) {
        let index = parseInt(cmdStr.split(',')[0])
        let operation = cmdStr.split(',')[1]
        switch (operation) {
          case 'detail':
            this.onClickHandleDetail(this.askLeaveList[index])
            break
          case 'edit':
            this.onClickHandleEdit(this.askLeaveList[index])
            break
          case 'delete':
            this.onClickHandleDelete(index)
            break
        }
      },
      onClickHandleDetail (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('请假详情', AskLeaveDetail.name, data))
      },
      onClickHandleEdit (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('请假', AskLeaveComponent.name, data))
      },
      onClickHandleDelete (index) {
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
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getAskLeaveList()
      })
      // 请假审批数据刷新
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_ASK_LEAVE, () => {
        this.getAskLeaveList()
      })
    }
  }
</script>

<style>

</style>
