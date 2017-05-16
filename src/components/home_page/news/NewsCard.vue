<template>
  <el-card class="card-panel">
    <div class="card-header"
         slot="header">
      <span>公告</span>
      <el-button size="small"
                 icon="plus"
                 style="float: right;"
                 @click="onClickAdd()"></el-button>
    </div>
    <div class="card-body">
      <div v-for="news in newsList"
           style="margin-top: 5px; margin-bottom: 5px">
        <div style="clear: both; margin-top: 5px; margin-bottom: 10px;">
          <a class="card-link"
             :href="news.link"
             target="_blank">{{news.title}}</a>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import * as Cons from '../../base/Constant'
  import * as MUTATIONS from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import Vue from 'vue'
  import News from './News.vue'
  import * as EventBus from '../../base/EventBus'

  Vue.component(News.name, News)

  export default{
    name: 'news-card',
    data () {
      return {
        newsList: []
      }
    },
    props: [],
    methods: {
      fetchNewsList () {
        this.$http.get(Cons.BASE_URL + '/news/all').then(response => {
          if (response.body.ok !== true) {
            this.$message('获取公告数据失败')
            return
          }
          this.newsList = response.body.newsList
        }, response => {
          this.$message('获取公告数据失败: ' + response.body.msg)
        })
      },
      onClickAdd () {
        let tabItem = new TabItem('新建公告', News.name, null)
        this.$store.commit(MUTATIONS.HOMEPAGE_ADD_TAB, tabItem)
      }
    },
    computed: {},
    created: function () {
      this.fetchNewsList()
      EventBus.instance.$on(EventBus.EVENT_UPDATE_NEWS, () => {
        this.fetchNewsList()
      })
    }
  }
</script>

<style>

</style>
