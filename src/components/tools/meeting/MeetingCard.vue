<template>
  <div>
    <el-card class="card-panel">
      <!--标题-->
      <div slot="header" class="card-header">
        <span class="card-title">待参会</span>
        <el-button size="small"
                   style="float: right"
                   @click="onClickRefresh()">
          刷新
        </el-button>
      </div>
      <!--问卷列表-->
      <div class="card-body">
        <div v-for="meeting in meetingList"
             style="margin-top: 5px; margin-bottom: 5px">
          <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
            <a class="card-link"
               href="javascript:void(0);"
               @click="onClickMeeting(meeting)">
              {{meeting.topic}} </a>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as MUTATIONS from '../../../store/mutation-types'

  export default{
    name: 'meeting-card',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickRefresh () {
        this.$store.dispatch(MUTATIONS.ACTION_FETCH_OPEN_MEETING)
      },
      onClickMeeting (meeting) {
        console.log('on click meeting')
      }
    },
    computed: {
      meetingList () {
        return this.$store.getters.getOpenMeetingList
      }
    },
    created: function () {
      this.$store.dispatch(MUTATIONS.ACTION_FETCH_OPEN_MEETING)
    }
  }
</script>

<style>

</style>
