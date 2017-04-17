<template>
  <div>
    <el-card class="card-panel">
      <!--标题-->
      <div slot="header" class="card-header">
        <span class="card-title">我管理的会议</span>
        <el-button-group style="float: right;">
          <el-button size="small"
                     icon="plus"
                     @click="onClickAdd()"></el-button>
          <el-button size="small"
                     style="float: right"
                     @click="onClickRefresh()">刷新
          </el-button>
        </el-button-group>
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
  import TabItem from '../../base/TabItem'
  import Meeting from './Metting.vue'
  import MeetingDetail from './MeetingDetail.vue'

  export default{
    name: 'owned-meeting-card',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickAdd () {
        this.$store.commit(MUTATIONS.TOOLS_ADD_TAB, new TabItem('新增会议', Meeting.name, null))
      },
      onClickRefresh () {
        this.$store.dispatch(MUTATIONS.ACTION_FETCH_OWNED_MEETING)
      },
      onClickMeeting (meeting) {
        this.$store.commit(MUTATIONS.TOOLS_ADD_TAB, new TabItem('会议详情', MeetingDetail.name, meeting))
      }
    },
    computed: {
      meetingList () {
        return this.$store.getters.getOwnedMeetingList
      }
    },
    created: function () {
      this.$store.dispatch(MUTATIONS.ACTION_FETCH_OWNED_MEETING)
    }
  }
</script>

<style>

</style>
