<template>
  <base-item :tabs="tabs"
             mainTabName="个人主页"
             :mainTabIs="MainTab.name"></base-item>
</template>

<script>
  import MainTab from './MainTab.vue'
  import BaseItem from '../base/BaseItem.vue'
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
        return this.$store.state.homePageModule.all_tabs
      }
    }
  }
</script>

<style>

</style>
