<template>
  <!--编辑或新建会议-->
  <div>
    <span slot="header">会议信息</span>

    <el-card style="margin: 20px;">
      <el-form label-width="110px"
               v-model="meeting"
               label-position="right">
        <!--会议主题-->
        <el-form-item label="会议主题:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input v-model="meeting.topic"></el-input>
          </div>
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
        <el-form-item label="请选择会议室:">
          <el-select placeholder="会议室"
                     class="form-item-content"
                     v-model="meeting.meetingRoom">
            <el-option v-for="meetingRoom in meetingRoomList"
                       :label="meetingRoom.name"
                       :value="meetingRoom.name"></el-option>
          </el-select>
        </el-form-item>
        <!--参会人员-->
        <el-form-item label="参会人员:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input @click.native="testOnClickInput()"
                      v-model="meeting.participant"></el-input>
          </div>
        </el-form-item>
        <!--主持人-->
        <el-form-item label="主持人:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input @click.native="testOnClickInput()"
                      v-model="meeting.hoster"></el-input>
          </div>
        </el-form-item>
        <!--详情说明-->
        <el-form-item label="说明:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input type="textarea"
                      v-model="meeting.description"></el-input>
          </div>
        </el-form-item>

        <el-button type="primary"
                   @click="onClickSubmit()"
                   :disabled="isFinished">提交申请
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import Meeting from './bean/meeting'
  import * as Cons from '../../base/Constant'
  import * as MUTATIONS from '../../../store/mutation-types'

  export default{
    name: 'meeting',
    data () {
      return {
        isFinished: false,
        meeting: this.data,
        meetingRoomList: [],
        // 用于格式化时间字符串的参数
        beginDate: '',
        timePeriod: [new Date(), new Date()],
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
      },
      testOnClickInput () {
        console.log('hahahha')
      },
      fillInMeetingData () {
        this.meeting.beginDate = this.beginDate.getTime()
        this.meeting.beginTime = this.timePeriod[0].getTime()
        this.meeting.endTime = this.timePeriod[1].getTime()
        this.meeting.sponsor = this.$store.state.mainModule.user.name
      },
      onClickSubmit () {
        this.fillInMeetingData()
        if (!this.meeting.isValid()) {
          this.$message('信息不完整')
          return
        }
        this.postMeetingEntity()
      },
      postMeetingEntity () {
        this.$http.post(Cons.BASE_URL + '/meeting/new', JSON.stringify(this.meeting))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败' + this.body.msg)
              return
            }
            this.$message('提交成功')
            this.isFinished = true
            // refresh panel meeting list
            this.$store.dispatch(MUTATIONS.ACTION_FETCH_OPEN_MEETING)
            this.$store.dispatch(MUTATIONS.ACTION_FETCH_OWNED_MEETING)
          }, response => {
            this.$message('提交失败')
          })
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
