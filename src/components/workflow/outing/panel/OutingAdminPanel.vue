<template>
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
    <el-table-column label="天数"
                     width="100"
                     prop="dayNum"></el-table-column>
    <el-table-column label="状态"
                     width="100">
      <template scope="scope">
        <el-tag :type="Utils.getStateColor(outingList[scope.$index].state)">
          {{outingList[scope.$index].state}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <!--the two button can is able only when in unapproved || approved state-->
        <el-button
          size="small"
          @click="onClickHandleDetail(scope.$index, scope.row)">详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import * as Cons from '../../../base/Constant'
  import * as MUTATION_TYPES from '../../../../store/mutation-types'
  import Outing from '../../outing/bean/outing'
  import OutingDetail from '../../outing/OutingDetail.vue'
  import OutingAdminDetail from '../../outing/OutingAdminDetail.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import * as EventBus from '../../../base/EventBus'
  import Utils from '../../../base/Utils'

  const URL_GET_ADMIN_OUTING = Cons.BASE_URL + '/outing/admin'

  export default{
    name: 'outing-admin-panel',
    data () {
      return {
        outingList: [],
        Utils
      }
    },
    props: [],
    methods: {
      getOutingList () {
        this.$http.get(URL_GET_ADMIN_OUTING)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('获取出差数据失败: ' + response.body.msg)
              return
            }
            this.outingList = Outing.parseOutingList(response.body.outingList)
            this.$store.commit(MUTATION_TYPES.WORKFLOW_SET_OUTING_ADMIN, this.outingList)
          }, response => {
            this.$message('获取出差数据失败')
          })
      },
      onClickHandleDetail (index, data) {
        if (data.state === Outing.STATE_APPROVED || data.state === Outing.STATE_DECLINE) {
          this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差详情', OutingDetail.name, data))
        } else {
          this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差详情', OutingAdminDetail.name, data))
        }
      }
    },
    computed: {},
    created: function () {
      this.getOutingList()
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_OUTING, () => {
        this.getOutingList()
      })
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getOutingList()
      })
    }
  }
</script>

<style>

</style>
