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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as MUTATION_TYPES from '../../../../store/mutation-types'
  import * as Cons from '../../../base/Constant'
  import TabItem from '../../../base/TabItem'
  import WorkOvertimeAdminDetail from '../WorkOvertimeAdminDetail.vue'
  import WorkOvertimeDetail from '../WorkOvertimeDetail.vue'
  import WorkOvertime from '../bean/workOvertime'
  import {EventBus} from '../../../base/EventBus'

  export default{
    name: 'work-overtime-admin-panel',
    data () {
      return {
        workOvertimeList: []
      }
    },
    props: ['data'],
    methods: {
      onClickHandleDetail (index, data) {
        if (data.state === WorkOvertime.STATE_APPROVED ||
          data.state === WorkOvertime.STATE_DECLINE) {
          this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('审批加班', WorkOvertimeDetail.name, data))
        } else {
          this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('审批加班', WorkOvertimeAdminDetail.name, data))
        }
      },
      getAdminWorkOvertimeList () {
        this.$http.get(Cons.BASE_URL + '/work_overtime/admin')
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('获取加班数据失败: ' + response.body.msg)
              return
            }
            this.workOvertimeList = WorkOvertime.parseWorkOvertimeList(response.body.workOvertimeList)
          }, response => {
            this.$message('获取加班数据失败')
          })
      }
    },
    computed: {},
    created: function () {
      this.getAdminWorkOvertimeList()
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_WORK_OVERTIME, () => {
        this.getAdminWorkOvertimeList()
      })
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getAdminWorkOvertimeList()
      })
    }
  }
</script>

<style>

</style>
