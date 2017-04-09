<template>
  <div>
    <!--需要展示的数据:-->
    <!--{-->
    <!--"id": 1,-->
    <!--"destination": "ShangHai",-->
    <!--"beginDate": "2017-11-11",-->
    <!--"endDate": "2017-11-11",-->
    <!--"dayNum": 1,-->
    <!--"description": "des",-->
    <!--"username": "ssthouse",-->
    <!--"approverUsername": "ssthouse",-->
    <!--"state": "begin"-->
    <!--}-->
    <el-table
      :data="outingList"
      stripe
      style="width: 100%">
      <el-table-column prop="destination"
                       label="目的地"
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
  import Outing from '../../outing/bean/outing'
  import OutingDetail from '../../outing/OutingDetail.vue'
  import OutingComponent from '../../outing/Outing.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import {EventBus} from '../../../base/EventBus'

  const URL_GET_OPEN_OUTING = Cons.BASE_URL + '/outing/open'

  export default{
    name: 'outing-panel',
    data () {
      return {
        outingList: []
      }
    },
    props: [],
    methods: {
      getOutingList () {
        this.$http.get(URL_GET_OPEN_OUTING)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('获取出差数据失败: ' + response.body.msg)
              return
            }
            this.outingList = Outing.parseOutingList(response.body.outingList)
          }, response => {
            this.$message('获取出差数据失败')
          })
      },
      onClickHandleDetail (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差详情', OutingDetail.name, data))
      },
      onClickHandleEdit (index, data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差', OutingComponent.name, data))
      },
      onClickHandleDelete (index, data) {
        this.$alert('确认删除? 此操作不可逆.', '确认操作', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.deleteOuting(index)
            }
          }
        })
      },
      deleteOuting (index) {
        this.$http.get(Cons.BASE_URL + '/outing/delete', {
          params: {
            id: this.outingList[index].id
          }
        }).then(response => {
          if (response.body.ok !== true) {
            this.$message(response.body.msg)
            return
          }
          this.$message('删除成功')
          this.getOutingList()
        }, response => {
          this.$message('删除失败')
        })
      }
    },
    computed: {},
    created: function () {
      this.getOutingList()
      // 全局数据刷新
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getOutingList()
      })
      // 出差审批数据刷新
      EventBus.$on(Cons.EVENT_WORKFLOW_UPDATE_OUTING, () => {
        this.getOutingList()
      })
    }
  }
</script>

<style>

</style>
