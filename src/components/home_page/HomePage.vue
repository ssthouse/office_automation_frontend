<template>
  <base-item :tabs="tabs"
             style="overflow-y: scroll"
             mainTabName="个人主页"
             :mainTabIs="MainTab.name"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"></base-item>
</template>

<script>
  import {instance} from '../base/EventBus'
  import * as Cons from '../base/Constant'
  import MainTab from './MainTab.vue'
  import BaseItem from '../base/BaseItem.vue'
  import Vue from 'vue'
  import * as types from '../../store/mutation-types'
  import UserInfo from './UserInfo.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(UserInfo.name, UserInfo)

  export default{
    name: 'home-page',
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
        return this.$store.state.homePageModule.allTabs
      }
    },
    methods: {
      /**
       *
       * @param tabName int str
       */
      handleRemoveTab (tabName) {
        let index = parseInt(tabName)
        let tabIs = this.tabs[index - 1].tabIs
        console.log(tabIs)
        this.$store.commit(types.HOMEPAGE_REMOVE_TAB, tabIs)
      }
    },
    created: function () {
      instance.$on(Cons.EVENT_HOMEPAGE_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    }
  }
</script>

<style>

</style>
