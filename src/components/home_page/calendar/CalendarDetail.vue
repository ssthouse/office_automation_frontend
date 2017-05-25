<template>
  <div>
    <div style="height: 540px;">
      <vue-event-calendar :events="eventList"
                          style="height: 540px;">
        <template scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item">
            <!-- In here do whatever you want, make you owner event template -->
            {{event}}
          </div>
        </template>
      </vue-event-calendar>


      <md-button class="md-fab md-fab-bottom-right"
                 @click.native="onClickAdd()">
        <md-icon>add</md-icon>
      </md-button>
    </div>

    <el-dialog title="新建日程" v-model="newCalendarVisible">
      <el-form v-model="newTodo"
               label-width="80px"
               label-position="right">
        <el-form-item label="日期:">
          <el-input placeholder="格式为: 2017/11/11"
                    v-model="newTodo.time"></el-input>
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
        }]
      }
    },
    props: [],
    methods: {
      onClickAdd () {
        this.newCalendarVisible = true
      },
      submitNewCalendar () {
        this.eventList.push({
          'date': this.newCalendar.date,
          'title': this.newCalendar.title,
          'desc': this.newCalendar.desc
        })
        this.newCalendarVisible = false
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>

</style>
