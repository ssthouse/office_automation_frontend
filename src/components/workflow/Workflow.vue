<template>
  <div>
    <base-item
      :tabs="tabs"
      v-on:remove-tab="handleRemoveTab"
      mainTabName="审批管理"
      :mainTabIs="MainTab.name"></base-item>
    <div>
      <md-button class="md-fab md-fab-bottom-right"
                 id="btnAdd"
                 @click.native="onClickAddWorkflow()">
        <md-icon>add</md-icon>
      </md-button>
    </div>

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
  import * as types from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  // the dynamic tab panel component
  import AskLeave from './ask_leave/AskLeave.vue'
  import WorkOvertime from './work_overtime/WorkOvertime.vue'
  import Outing from './outing/Outing.vue'

  import Vue from 'vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(AskLeave.name, AskLeave)

  export default{
    name: '',
    data () {
      return {
        MainTab: MainTab
      }
    },
    computed: {
      tabs () {
        return this.$store.state.workflowModule.workflow_tabs
      }
    },
    methods: {
      handleRemoveTab (tabIs) {
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
    props: [],
    components: {
      'base-item': BaseItem
    }
  }
</script>

<style>
</style>
