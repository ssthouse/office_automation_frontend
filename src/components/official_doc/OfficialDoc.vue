<template>
  <div>
    <base-item :tabs="tabs"
               :mainTabIs="MainTab.name"
               :activeTabIndex="activeTabIndex"
               v-on:remove-tab="handleRemoveTab"
               mainTabName="公文处理">
      This is the official doc.
    </base-item>

    <!--floating action button-->
    <md-button class="md-fab md-fab-bottom-right"
               style="visibility: hidden;"
               id="btnAdd"
               @click.native="onClickOpenDialog()">
      <md-icon>add</md-icon>
    </md-button>

    <!--dialog to select new workflow type-->
    <!--<md-dialog md-open-from="#btnAdd" md-close-from="#btnAdd" ref="dialogAdd">-->
      <!--<md-dialog-title>发起公文</md-dialog-title>-->
      <!--<md-dialog-content>-->
        <!--<md-list>-->
          <!--<md-button @click.native="onClickDispatch()">发文单</md-button>-->
          <!--<md-button @click.native="onClickInComing()">收文单</md-button>-->
        <!--</md-list>-->
      <!--</md-dialog-content>-->
    <!--</md-dialog>-->
  </div>
</template>

<script>
  import * as EventBus from '../base/EventBus'
  import * as MUTATIONS from '../../store/mutation-types'
  import BaseItem from '../base/BaseItem.vue'
  import MainTab from './MainTab.vue'
  import Vue from 'vue'
  // tabs component
  import TabItem from '../base/TabItem'
  import DispatchDoc from './DispatchDoc.vue'
  import IncomingDoc from './IncomingDoc.vue'
  import DispatchDetail from './DispatchDetail.vue'
  import DealDispatch from './DealDispatch.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(DispatchDoc.name, DispatchDoc)
  Vue.component(IncomingDoc.name, IncomingDoc)
  Vue.component(DispatchDetail.name, DispatchDetail)
  Vue.component(DealDispatch.name, DealDispatch)

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
        this.$store.commit(MUTATIONS.OFFICIAL_DOC_REMOVE_TAB, tabIs)
      },
      onClickOpenDialog () {
//        this.$refs['dialogAdd'].open()
      },
      onClickDispatch () {
        this.$store.commit(MUTATIONS.OFFICIAL_DOC_ADD_TAB, new TabItem('发起发文单', DispatchDoc.name, null))
      },
      onClickInComing () {
//        this.$refs['dialogAdd'].close()
        this.$store.commit(MUTATIONS.OFFICIAL_DOC_ADD_TAB, new TabItem('发起收文单', IncomingDoc.name, null))
      }
    },
    created: function () {
      EventBus.instance.$on(EventBus.EVENT_OFFICIAL_DOC_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
      // the event of try to click the add button
      EventBus.instance.$on(EventBus.EVENT_OFFICIAL_DOC_CLICK_NEW, () => {
        // 去除dialog选择公文类型 => 只保留dispatch类型公文
        // this.onClickOpenDialog()
        this.onClickDispatch()
      })
    }
  }
</script>

<style>

</style>
