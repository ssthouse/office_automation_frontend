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
  import Outing from '../../outing/bean/outing'
  import OutingDetail from '../../outing/OutingDetail.vue'
  import OutingComponent from '../../outing/Outing.vue'
  import TabItem from '../../../base/TabItem'
  // eventbus
  import * as EventBus from '../../../base/EventBus'
  import Utils from '../../../base/Utils'

  const URL_GET_OPEN_OUTING = Cons.BASE_URL + '/outing/open'

  export default{
    name: 'outing-panel',
    data () {
      return {
        outingList: [],
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
            this.onClickHandleDetail(this.outingList[index])
            break
          case 'edit':
            this.onClickHandleEdit(this.outingList[index])
            break
          case 'delete':
            this.onClickHandleDelete(index)
            break
        }
      },
      getOutingList () {
        this.$http.get(URL_GET_OPEN_OUTING)
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('获取出差数据失败: ' + response.body.msg)
              return
            }
            this.outingList = Outing.parseOutingList(response.body.outingList)
            this.$store.commit(MUTATION_TYPES.WORKFLOW_SET_OUTING, this.outingList)
          }, response => {
            this.$message('获取出差数据失败')
          })
      },
      onClickHandleDetail (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差详情', OutingDetail.name, data))
      },
      onClickHandleEdit (data) {
        this.$store.commit(MUTATION_TYPES.WORKFLOW_ADD_TAB, new TabItem('出差', OutingComponent.name, data))
      },
      onClickHandleDelete (index) {
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
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_ALL, () => {
        this.getOutingList()
      })
      // 出差审批数据刷新
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_UPDATE_OUTING, () => {
        this.getOutingList()
      })
    }
  }
</script>

<style>

</style>
