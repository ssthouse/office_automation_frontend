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
      <el-table-column label="状态">
        <template scope="scope">
          <el-tag :type="Utils.getOfficialDocStateColor(dispatchList[scope.$index].state)">
            {{Utils.getOfficialDocStateName(dispatchList[scope.$index].state)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="280">
        <template scope="scope">
          <el-button @click="onClickDetail(scope.$index)" size="small">查看</el-button>
          <el-button @click="onClickDeal(scope.$index)" size="small">办理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Utils from '../../base/Utils'
  import * as Mutations from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import * as EventBus from '../../base/EventBus'
  import * as Cons from '../../base/Constant'
  import DispatchDetail from '../DispatchDetail.vue'
  import DealDispatch from '../DealDispatch.vue'

  export default{
    name: 'official-doc-user-panel',
    data () {
      return {
        dispatchList: [],
        Utils: Utils
      }
    },
    props: [],
    methods: {
      onClickDetail (index) {
        this.$store.commit(Mutations.OFFICIAL_DOC_ADD_TAB, new TabItem('公文详情', DispatchDetail.name, this.dispatchList[index]))
      },
      onClickDeal (index) {
        this.$store.commit(Mutations.OFFICIAL_DOC_ADD_TAB, new TabItem('处理公文', DealDispatch.name, this.dispatchList[index]))
      },
      fetchDispatchList () {
        this.$http.get(Cons.BASE_URL + '/dispatch/user')
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
    computed: {},
    created: function () {
      this.fetchDispatchList()
      EventBus.instance.$on(EventBus.EVENT_OFFICIAL_DOC_UPDATE_ALL_DISPATCH, () => {
        this.fetchDispatchList()
      })
    }
  }
</script>

<style>

</style>
