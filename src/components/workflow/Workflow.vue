<template>
  <div>
    <base-item
      :tabs="tabs"
      :activeTabIndex="activeTabIndex"
      style="height: 100%;"
      v-on:remove-tab="handleRemoveTab"
      mainTabName="审批管理"
      :mainTabIs="MainTab.name"></base-item>

    <md-button class="md-fab md-fab-bottom-right"
               style="margin-bottom: 60px;"
               id="btnAdd"
               @click.native="onClickAddWorkflow()">
      <md-icon>add</md-icon>
    </md-button>

    <!--dialog to select new workflow type-->
    <md-dialog md-open-from="#btnAdd" md-close-from="#btnAdd" ref="dialogAdd">
      <md-dialog-title>新建审批</md-dialog-title>
      <md-dialog-content>
        <md-list>
          <md-button @click.native="onClickAskLeave()">请假</md-button>
          <md-button @click.native="onClickWorkOvertime()">加班</md-button>
          <md-button @click.native="onClickOuting()">出差</md-button>
        </md-list>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
  import TabItem from '../base/TabItem'
  import * as types from '../../store/mutation-types'
  import * as EventBus from '../base/EventBus'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  // new workflows
  import AskLeave from './ask_leave/AskLeave.vue'
  import WorkOvertime from './work_overtime/WorkOvertime.vue'
  import Outing from './outing/Outing.vue'

  import Vue from 'vue'

  Vue.component(MainTab.name, MainTab)

  export default{
    name: '',
    data () {
      return {
        MainTab: MainTab,
        // the default active tab index is 0
        activeTabIndex: '0'
      }
    },
    computed: {
      tabs () {
        return this.$store.state.workflowModule.workflow_tabs
      }
    },
    methods: {
      handleRemoveTab (tabName) {
        let index = parseInt(tabName) - 1
        let tabIs = this.tabs[index].tabIs
        this.$store.commit(types.WORKFLOW_REMOVE_TAB, tabIs)
      },
      onClickAddWorkflow () {
        this.$refs['dialogAdd'].open()
      },
      onClickAskLeave () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建请假流程', AskLeave.name, null))
        this.$refs['dialogAdd'].close()
      },
      onClickWorkOvertime () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建加班审批', WorkOvertime.name, null))
        this.$refs['dialogAdd'].close()
      },
      onClickOuting () {
        this.$store.commit(types.WORKFLOW_ADD_TAB, new TabItem('新建出差', Outing.name, null))
        this.$refs['dialogAdd'].close()
      }
    },
    created: function () {
      // register the tab change event
      EventBus.instance.$on(EventBus.EVENT_WORKFLOW_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    },
    props: [],
    components: {
      'base-item': BaseItem
    }
  }
</script>

<style>
</style>
