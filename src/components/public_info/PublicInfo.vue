<template>
  <base-item mainTabName='公共消息主页'
             v-on:remove-tab="handleRemoveTab"
             :mainTabIs="MainTab.name"
             :tabs="tabs"></base-item>
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
        MainTab
      }
    },
    props: [],
    components: {
      'base-item': BaseItem
    },
    computed: {
      tabs () {
        return this.$store.state.publicInfoModule.allTabs
      }
    },
    methods: {
      handleRemoveTab (tabIs) {
        this.$store.commit(types.PUBLIC_INFO_REMOVE_TAB, tabIs)
      }
    }
  }
</script>

<style>

</style>
