<template>
  <el-card class="card-panel">
    <div slot="header"
         class="card-header">
      <span>工作日程</span>
      <el-button size="small"
                 icon="date"
                 style="float: right;"
                 @click="onClickDetail()"></el-button>
    </div>
    <div class="card-body">
      <div v-for="todo in todoList"
           style="margin-top: 5px; margin-bottom: 5px">
        <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
          <a class="card-link"
             href="javascript:void(0);">{{todo}}</a>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import * as MUTATIONS from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import CalendarDetail from './CalendarDetail.vue'

  export default{
    name: 'calendar-card',
    data () {
      return {
        todoList: [
          '提交后台分工会议纪要',
          '提交公文处理, 等待上级的审批',
          '安排技术面试算法题'
        ]
      }
    },
    props: [],
    methods: {
      onClickDetail () {
        this.$store.commit(MUTATIONS.HOMEPAGE_ADD_TAB, new TabItem('日程详情', CalendarDetail.name, null))
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>

</style>
