<template>
  <base-item
    :tabs="tabs"
    :activeTabIndex="activeTabIndex"
    style="height: 100%;"
    v-on:remove-tab="handleRemoveTab"
    mainTabName="审批管理"
    :mainTabIs="MainTab.name"></base-item>

</template>

<script>
  import * as types from '../../store/mutation-types'
  import {EventBus} from '../base/EventBus'
  import * as Cons from '../base/Constant'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'

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
        let tabIs = this.$store.state.workflowModule.workflow_tabs[index].tabIs
        this.$store.commit(types.WORKFLOW_REMOVE_TAB, tabIs)
      }
    },
    created: function () {
      // register the tab change event
      EventBus.$on(Cons.EVENT_WORKFLOW_NEW_TAB, () => {
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
