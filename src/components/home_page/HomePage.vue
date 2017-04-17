<template>
  <base-item :tabs="tabs"
             style="overflow-y: scroll"
             mainTabName="个人主页"
             :mainTabIs="MainTab.name"
             :activeTabIndex="activeTabIndex"
             v-on:remove-tab="handleRemoveTab"></base-item>
</template>

<script>
  import * as EventBus from '../base/EventBus'
  import MainTab from './MainTab.vue'
  import BaseItem from '../base/BaseItem.vue'
  import Vue from 'vue'
  import * as types from '../../store/mutation-types'
  // components
  import NewsCard from './news/NewsCard.vue'
  import News from './news/News.vue'
  import ImgNewsCard from './img_news/ImgNewsCard.vue'
  import CalendarCard from './calendar/CalendarCard.vue'
  import UserInfo from './userinfo/UserInfo.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(UserInfo.name, UserInfo)
  Vue.component(NewsCard.name, NewsCard)
  Vue.component(News.name, News)
  Vue.component(ImgNewsCard.name, ImgNewsCard)
  Vue.component(CalendarCard.name, CalendarCard)

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
      EventBus.instance.$on(EventBus.EVENT_HOMEPAGE_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
    }
  }
</script>

<style>

</style>
