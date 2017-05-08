<template>
  <!--{-->
  <!--"id": 1,-->
  <!--"isHoliday": true,-->
  <!--"beginDate": "2017-11-11",-->
  <!--"endDate": "2017-11-11",-->
  <!--"hourNum": 1,-->
  <!--"description": "des",-->
  <!--"username": "ssthouse",-->
  <!--"approverUsername": "ssthouse",-->
  <!--"state": "draft"-->
  <!--}-->
  <el-table
    :data="workOvertimeList"
    stripe
    style="width: 100%">
    <el-table-column label="时长"
                     width="100"
                     prop="hourNum"></el-table-column>
    <el-table-column label="状态"
                     width="100">
      <template scope="scope">
        <el-tag :type="Utils.getStateColor(workOvertimeList[scope.$index].state)">
          {{workOvertimeList[scope.$index].state}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="审批人"
                     width="100"
                     prop="approverUsername"></el-table-column>
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
  import WorkOvertime from '../../work_overtime/WorkOvertime.vue'
  import WorkOvertimeEntity from '../../work_overtime/bean/workOvertime'
  import WorkOvertimeDetail from '../../work_overtime/WorkOvertimeDetail.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import * as EventBus from '../../../base/EventBus'
  import Utils from '../../../base/Utils'

  const URL_GET_OPEN_WORK_OVERTIME = Cons.BASE_URL + '/work_overtime/open'
  const URL_GET_DELETE_WORK_OVERTIME = Cons.BASE_URL + '/work_overtime/delete'

  export default{
    name: 'work-overtime-panel',
    data () {
      return {
        workOvertimeList: [],
        Utils
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
            this.onClickHandleDetail(this.workOvertimeList[index])
            break
          case 'edit':
            this.onClickHandleEdit(this.workOvertimeList[index])
            break
          case 'delete':
            this.onClickHandleDelete(this.workOvertimeList[index])
            break
        }
      },
      onClickHandleDetail (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('加班审批详情', WorkOvertimeDetail.name, data))
      },
      onClickHandleEdit (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('编辑加班审批', WorkOvertime.name, data))
      },
      onClickHandleDelete (data) {
        this.$http.get(URL_GET_DELETE_WORK_OVERTIME, {params: {entityId: data.id}})
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('删除失败: ' + response.body.msg)
              return
            }
            this.$message('删除成功')
            EventBus.instance.$emit(EventBus.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME)
          }, response => {
            this.$message('删除失败')
          })
      },
      getWorkOvertimeList () {
        this.$http.get(URL_GET_OPEN_WORK_OVERTIME)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('获取加班数据失败: ' + response.body.msg)
              return
            }
            this.workOvertimeList = WorkOvertimeEntity.parseWorkOvertimeList(response.body.workOvertimeList)
            this.$store.commit(MUTATION_TYPES.WORKFLOW_SET_WORK_OVERTIME, this.workOvertimeList)
          }, response => {
            this.$message('获取加班数据失败')
          })
      }
    },
    computed: {},
    created: function () {
      this.getWorkOvertimeList()
      // 注册监听事件
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME, () => {
        this.getWorkOvertimeList()
      })
    }
  }
</script>

<style>

</style>
