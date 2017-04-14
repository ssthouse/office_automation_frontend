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
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  import * as types from '../../store/mutation-types'

  Vue.component(MainTab.name, MainTab)

  export default{
    name: '',
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
      handleRemoveTab (tabIs) {
        this.$store.commit(types.OFFICIAL_DOC_REMOVE_TAB, tabIs)
      }
    }
  }
</script>

<style>

</style>
