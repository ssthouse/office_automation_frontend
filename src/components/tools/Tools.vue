<template>
  <base-item :tabs="tabs"
             mainTabName="工具集"
             :mainTabIs="MainTab.name">
  </base-item>
</template>

<script>
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  import Questionnaire from './questionnaire/Questionnaire.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(Questionnaire.name, Questionnaire)

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
        return this.$store.state.toolsModule.allTabs
      }
    }
  }
</script>

<style>

</style>
