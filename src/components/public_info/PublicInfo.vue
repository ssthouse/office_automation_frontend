<template>
  <base-item mainTabName='公共消息主页'
             :mainTabIs="MainTab.name"
             :tabs="tabs"></base-item>
</template>

<script>
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'

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
    }
  }
</script>

<style>

</style>
