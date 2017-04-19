<template>
  <base-item :tabs="tabs"
             mainTabName="工具集"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"
             :mainTabIs="MainTab.name">
  </base-item>
</template>

<script>
  import * as EventBus from '../base/EventBus'
  import BaseItem from '../base/BaseItem.vue'
  import * as types from '../../store/mutation-types'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'

  Vue.component(MainTab.name, MainTab)

  export default{
    name: 'tools',
    data () {
      return {
        MainTab,
        activeTabIndex: '0'
      }
    },
    props: [],
    components: {
      'base-item': BaseItem
    },
    computed: {
      tabs () {
        return this.$store.state.toolsModule.allTabs
      }
    },
    methods: {
      /**
       * handle base item remove tab event
       * @param tabName number str
       */
      handleRemoveTab (tabName) {
        let index = parseInt(tabName)
        let tabIs = this.tabs[index - 1].tabIs
        this.$store.commit(types.TOOLS_REMOVE_TAB, tabIs)
      }
    },
    created: function () {
      EventBus.instance.$on(EventBus.EVENT_TOOLS_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    }
  }
</script>

<style>

</style>
