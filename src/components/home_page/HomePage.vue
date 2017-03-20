<template>
  <base-item :tabs="tabs"
             style="overflow-y: scroll"
             mainTabName="个人主页"
             :mainTabIs="MainTab.name"
             v-on:remove-tab="handleRemoveTab"></base-item>
</template>

<script>
  import MainTab from './MainTab.vue'
  import BaseItem from '../base/BaseItem.vue'
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
        return this.$store.state.homePageModule.all_tabs
      }
    },
    methods: {
      handleRemoveTab (tabIs) {
        // 从store中移除当前tabIs的tab
        this.$store.commit(types.HOMEPAGE_REMOVE_TAB, tabIs)
      }
    }
  }
</script>

<style>

</style>
