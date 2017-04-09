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
  <div>
    <el-table
      :data="workOvertimeList"
      stripe
      style="width: 100%">
      <el-table-column label="时间区间"
                       width="220">
        <template scope="scope">
          <span>{{scope.row.beginDate}} 至 {{scope.row.endDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长"
                       width="100"
                       prop="hourNum"></el-table-column>
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
  import WorkOvertime from '../../work_overtime/WorkOvertime.vue'
  import WorkOvertimeDetail from '../../work_overtime/WorkOvertimeDetail.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import {EventBus} from '../../../base/EventBus'

  const URL_GET_OPEN_WORK_OVERTIME = Cons.BASE_URL + '/work_overtime/open'
  const URL_GET_DELETE_WORK_OVERTIME = Cons.BASE_URL + '/work_overtime/delete'

  export default{
    name: 'work-overtime-panel',
    data () {
      return {
        workOvertimeList: []
      }
    },
    props: [],
    methods: {
      onClickHandleDetail (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('加班审批详情', WorkOvertimeDetail.name, data))
      },
      onClickHandleEdit (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('编辑加班审批', WorkOvertime.name, data))
      },
      onClickHandleDelete (index, data) {
        this.$http.get(URL_GET_DELETE_WORK_OVERTIME, {params: {entityId: data.id}})
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('删除失败: ' + response.body.msg)
              return
            }
            this.$message('删除成功')
            EventBus.$emit(Cons.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME)
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
            this.workOvertimeList = response.body.workOvertimeList
          }, response => {
            this.$message('获取加班数据失败')
          })
      }
    },
    computed: {},
    created: function () {
      // TODO ask for the data list
      this.getWorkOvertimeList()
      // 注册监听事件
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME, () => {
        this.getWorkOvertimeList()
      })
    }
  }
</script>

<style>

</style>
