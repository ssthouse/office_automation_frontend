<template>
  <div>
    <div style="height: 540px;">
      <vue-event-calendar :events="todoList"
                          style="height: 540px;">
        <template scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item"
               style=" text-align: center">
            <!-- In here do whatever you want, make you owner event template -->
            <span style="font-size: larger; margin-top: 20px; text-align: center">{{event.content}}</span>
            <span style="margin-top: 20px; text-align: center">{{event.date}}</span>
            <md-button @click.native="onDeleteOnIndex(index)">删除</md-button>
          </div>
        </template>
      </vue-event-calendar>


      <md-button class="md-fab md-fab-bottom-center"
                 @click.native="onClickAdd()">
        <md-icon>add</md-icon>
      </md-button>
    </div>

    <el-dialog title="新建日程" v-model="newCalendarVisible">
      <el-form v-model="newTodo"
               label-width="80px"
               label-position="right">
        <el-form-item label="日期:">
          <el-date-picker type="date"
                          v-model="newTodo.time"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="newTodo.content"></el-input>
        </el-form-item>
        <el-button @click="submitNewCalendar()">确认添加</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Todo from './bean/todo'
  import Utils from '../../base/Utils'
  import * as Cons from '../../base/Constant'
  import * as EventBus from '../../base/EventBus'
  import * as types from '../../../store/mutation-types'

  export default{
    name: 'calendar-detail',
    data () {
      return {
        newCalendarVisible: false,
        // 用于保存新建的calendar
        newTodo: new Todo(),
        // 所有的event
        eventList: [{
          date: '2016/12/15',
          title: '提交会议纪要',
          desc: '本次后台任务的划分已经非常明确, 接下来的一个月的工作安排就按照这次会议的纪要来进行'
        }, {
          date: '2016/11/12',
          title: '提交公文处理, 等待上级的审批',
          desc: '审批后及得自己再检查一遍再提交下一个流程'
        }, {
          date: '2017/4/18',
          title: '安排技术面试算法题',
          desc: '准备安卓和后台面试人员的算法题目'
        }],
        todoList: []
      }
    },
    props: [],
    methods: {
      onClickAdd () {
        this.newCalendarVisible = true
      },
      submitNewCalendar () {
        // 填充todo数据
        this.newTodo.time = this.newTodo.time.getTime()
        this.newTodo.creater = this.$store.state.mainModule.user.username
        this.$http.post(Cons.BASE_URL + '/todo/add', JSON.stringify(this.newTodo))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败')
              return
            }
            // 显示提示 刷新数据
            this.$message('提交成功')
            this.$store.dispatch(types.HOMEPAGE_ACTION_UPDATE_TODO_LIST)
            // 隐藏dialog
            this.newCalendarVisible = false
          }, response => {
            this.$message('提交失败')
          })
        this.newTodo.time = new Date()
      },
      onDeleteOnIndex (index) {
        this.$http.get(Cons.BASE_URL + '/todo/delete', {params: {id: this.todoList[index].id}})
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('操作失败')
              return
            }
            this.$message('删除成功')
            this.$store.dispatch(types.HOMEPAGE_ACTION_UPDATE_TODO_LIST)
          }, response => {
            this.$message('操作失败')
          })
      },
      getTodoList () {
        this.todoList = this.$store.state.homePageModule.todoList
        // 为todoList填充date属性
        this.todoList.forEach(function (todo) {
          todo.date = Utils.getDateStrWithSlash(new Date(todo.time))
        })
      }
    },
    computed: {},
    created: function () {
      this.getTodoList()
      EventBus.instance.$on(EventBus.EVENT_HOMEPAGE_UPDATE_TODO, () => {
        this.getTodoList()
      })
      this.newTodo.time = new Date()
    }
  }
</script>

<style>

</style>
