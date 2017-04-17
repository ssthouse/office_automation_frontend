<template>
  <!--查看会议详情-->
  <div>
    <span slot="header">会议信息</span>

    <el-card style="margin: 20px;">
      <el-form label-width="110px"
               v-model="meeting"
               label-position="right">
        <!--会议主题-->
        <el-form-item label="会议主题:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input :disabled="true"
                      v-model="meeting.topic"></el-input>
          </div>
        </el-form-item>
        <!--会议时间-->
        <el-form-item label="会议时间">
          <div class="form-item-content">
            <el-date-picker placeholder="起始日期"
                            :disabled="true"
                            v-model="beginDate"
                            type="date"></el-date-picker>
            <el-time-picker placeholder="会议时间范围"
                            :disabled="true"
                            is-range
                            v-model="timePeriod"></el-time-picker>
          </div>
        </el-form-item>
        <!--选择会议室-->
        <el-form-item label="请选择会议室:">
          <el-select placeholder="会议室"
                     :disabled="true"
                     class="form-item-content"
                     v-model="meeting.meetingRoom">
          </el-select>
        </el-form-item>
        <!--参会人员-->
        <el-form-item label="参会人员:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input :disabled="true"
                      v-model="meeting.participant"></el-input>
          </div>
        </el-form-item>
        <!--主持人-->
        <el-form-item label="主持人:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input :disabled="true"
                      v-model="meeting.hoster"></el-input>
          </div>
        </el-form-item>
        <!--详情说明-->
        <el-form-item label="说明:">
          <div style="margin-left: 20px; margin-right: 20px;">
            <el-input type="textarea"
                      :disabled="true"
                      v-model="meeting.description"></el-input>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default{
    name: 'meeting-detail',
    data () {
      return {
        meeting: '',
        beginDate: '',
        timePeriod: []
      }
    },
    props: ['data'],
    methods: {},
    computed: {},
    created: function () {
      this.meeting = this.data
      this.beginDate = new Date(this.meeting.beginDate)
      this.timePeriod[0] = new Date(this.meeting.beginTime)
      this.timePeriod[1] = new Date(this.meeting.endTime)
    }
  }
</script>

<style>

</style>
