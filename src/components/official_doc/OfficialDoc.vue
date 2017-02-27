<template>
  <base-item :tabs="tabs"
             :mainTabIs="MainTab.name"
             mainTabName="公文处理">
    This is the official doc.
  </base-item>
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
        return this.$store.state.officialDocModule.allTabs
      }
    }
  }
</script>

<style>

</style>
