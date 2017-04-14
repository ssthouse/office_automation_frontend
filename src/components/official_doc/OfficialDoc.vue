<template>
  <base-item :tabs="tabs"
             :mainTabIs="MainTab.name"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"
             mainTabName="公文处理">
    This is the official doc.
  </base-item>
</template>

<script>
  import {EventBus} from '../base/EventBus'
  import * as Cons from '../base/Constant'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  import * as types from '../../store/mutation-types'

  Vue.component(MainTab.name, MainTab)

  export default{
    name: 'official-doc',
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
        return this.$store.state.officialDocModule.allTabs
      }
    },
    methods: {
      handleRemoveTab (tabName) {
        let index = parseInt(tabName)
        let tabIs = this.tabs[index - 1].tabIs
        this.$store.commit(types.OFFICIAL_DOC_REMOVE_TAB, tabIs)
      }
    },
    created: function () {
      EventBus.$on(Cons.EVENT_OFFICIAL_DOC_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    }
  }
</script>

<style>

</style>
