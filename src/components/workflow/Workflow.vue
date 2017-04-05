<template>
  <base-item
    :tabs="tabs"
    v-on:remove-tab="handleRemoveTab"
    mainTabName="审批管理"
    :mainTabIs="MainTab.name"></base-item>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  // the dynamic tab panel component
  import NewAskLeave from './ask_leave/NewAskLeave.vue'

  import Vue from 'vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(NewAskLeave.name, NewAskLeave)

  export default{
    name: '',
    data () {
      return {
        MainTab
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
