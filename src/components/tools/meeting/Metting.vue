<template>
  <!--编辑或新建会议-->
  <div>
    <span slot="header">会议信息</span>

    <el-card style="margin: 20px;">
      <el-form label-width="80px"
               v-model="meeting"
               label-position="right">
        <!--会议主题-->
        <el-form-item label="会议主题:">
          <el-input v-model="meeting.topic"></el-input>
        </el-form-item>
        <!--会议时间-->
        <el-form-item label="会议时间">
          <div class="form-item-content">
            <el-date-picker placeholder="起始日期"
                            v-model="beginDate"
                            :picker-options="pickerOptionsStartDate"
                            type="date"></el-date-picker>
            <el-time-picker placeholder="会议时间范围"
                            is-range
                            v-model="timePeriod"></el-time-picker>
          </div>
        </el-form-item>
        <!--选择会议室-->
        <el-form-item>
          <el-selector placeholder="请选择会议室" v-model="meeting.meetingRoom">
            <el-options>

            </el-options>
          </el-selector>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
  import Meeting from './bean/meeting'
  import * as Cons from '../../base/Constant'

  export default{
    name: 'meeting',
    data () {
      return {
        meeting: this.data,
        meetingRoomList: [],
        // 用于格式化时间字符串的参数
        beginDate: '',
        timePeriod: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        pickerOptionsStartDate: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      }
    },
    props: [],
    methods: {
      fetchMeetingRoomData () {
        // 请求会议室数据
        this.$http.get(Cons.BASE_URL + '/meeting_room/all')
          .then(response => {
            if (response.body.ok !== true) {
              return
            }
            this.meetingRoomList = response.body.meetingRoomList
          }, response => {})
      }
    },
    computed: {},
    created: function () {
      this.fetchMeetingRoomData()
      // means create new meeting
      if (this.data === null || this.data === undefined) {
        this.meeting = Meeting.getEmptyMeeting()
        return
      }
      this.meeting = this.data
    }
  }
</script>

<style>

</style>
