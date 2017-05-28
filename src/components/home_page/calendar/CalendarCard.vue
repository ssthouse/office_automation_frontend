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
             href="javascript:void(0);">{{todo.content}}</a>
          <span class="card-link"
                style="float: right;">
            {{Utils.getFormatDateStr(new Date(todo.time))}}
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import * as MUTATIONS from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import CalendarDetail from './CalendarDetail.vue'
  import Utils from '../../base/Utils'

  export default{
    name: 'calendar-card',
    data () {
      return {
        todoList: this.$store.state.homePageModule.todoList,
        Utils: Utils
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
      this.$store.dispatch(MUTATIONS.HOMEPAGE_ACTION_UPDATE_TODO_LIST)
    }
  }
</script>

<style>

</style>
