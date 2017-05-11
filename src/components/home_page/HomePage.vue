<template>
  <div>
    <base-item :tabs="tabs" style="overflow-y: scroll"
               mainTabName="个人首页"
               :mainTabIs="MainTab.name"
               :activeTabIndex="activeTabIndex"
               v-on:remove-tab="handleRemoveTab"></base-item>

    <md-button class="md-fab md-fab-bottom-right" id="btnConfig" @click.native="onClickConfig()">
      <md-icon>home</md-icon>
    </md-button>

    <!--dialog to select new workflow type-->
    <md-dialog md-open-from="#btnConfig" md-close-from="#btnConfig" ref="dialogConfig">
      <md-dialog-title>定制首页</md-dialog-title>
      <md-dialog-content>
        <el-checkbox-group v-model="newConfig">
          <el-checkbox :label="Cons.HOMEPAGE_IMG_NEWS">图片新闻</el-checkbox>
          <el-checkbox :label="Cons.HOMEPAGE_NEWS">公告</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_QUESTIONNAIRE">我的问卷</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_QUESTIONNAIRE_ADMIN">我管理的问卷</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_VOTING">我的投票</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_VOTING_ADMIN">我管理的投票</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_MEETING">我的会议</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_MEETING_ADMIN">我管理的会议</el-checkbox>
          <el-button @click="updateConfig()" style="margin-left: 40px;">更新设置
          </el-button>
        </el-checkbox-group>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
  import * as EventBus from '../base/EventBus'
  import * as Cons from '../base/Constant'
  import MainTab from './MainTab.vue'
  import BaseItem from '../base/BaseItem.vue'
  import Vue from 'vue'
  import * as MUTATIONS from '../../store/mutation-types'
  // components
  import NewsCard from './news/NewsCard.vue'
  import News from './news/News.vue'
  import ImgNewsCard from './img_news/ImgNewsCard.vue'
  import UserInfo from './userinfo/UserInfo.vue'

  Vue.component(MainTab.name, MainTab)
  Vue.component(UserInfo.name, UserInfo)
  Vue.component(NewsCard.name, NewsCard)
  Vue.component(News.name, News)
  Vue.component(ImgNewsCard.name, ImgNewsCard)

  export default {
    name: 'home-page',
    data () {
      return {
        MainTab,
        Cons: Cons,
        activeTabIndex: '0',
        newConfig: []
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
        this.$store.commit(MUTATIONS.HOMEPAGE_REMOVE_TAB, tabIs)
      },
      onClickConfig () {
        this.$refs['dialogConfig'].open()
      },
      updateConfig () {
        this.$refs['dialogConfig'].close()
        // TODO how to update the config??
        this.$store.dispatch(MUTATIONS.ACTION_POST_USER_CONFIG_HOMEPAGE, this.newConfig.join(','))
          .then(success => {
            this.$message('更新成功')
            EventBus.instance.$emit(EventBus.EVENT_MAIN_UPDATE_USER_CONFIG)
            this.$store.commit(MUTATIONS.MAIN_SET_USER_HOMEPAGE_CONFIG, this.newConfig.join(','))
          }, fail => {
            this.$message('更新失败')
          })
      },
      initConfig () {
        let _this = this
        let cardNameList = this.$store.getters.getHomePageConfig
        this.newConfig = []
        cardNameList.forEach(function (cardName) {
          _this.newConfig.push(cardName)
        })
      }
    },
    created: function () {
      this.initConfig()
      EventBus.instance.$on(EventBus.EVENT_HOMEPAGE_NEW_TAB, () => {
        let index = this.tabs.length
        this.activeTabIndex = index.toString()
      })
      EventBus.instance.$on(EventBus.EVENT_MAIN_UPDATE_USER_CONFIG, () => {
        this.initConfig()
      })
    }
  }
</script>

<style>

</style>
