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
        <el-row style="margin-top: 5px; margin-bottom: 10px;">
          <el-col :span="20">
            <a :href="news.link"
               class="card-link"
               target="_blank">{{news.title}}</a>
          </el-col>

          <el-col :span="4">
            <el-button type="text"
                       :disabled="!showDeleteButton(news)"
                       @click="onDeleteNews(news)">删除
            </el-button>
          </el-col>
        </el-row>
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
      showDeleteButton (news) {
        return news.creater === this.$store.state.mainModule.user.username
      },
      onDeleteNews (news) {
        this.$http.get(Cons.BASE_URL + '/news/delete', {params: {beanId: news.id}})
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('删除失败: ' + response.body.msg)
              return
            }
            this.$message('删除成功')
            EventBus.instance.$emit(EventBus.EVENT_UPDATE_NEWS)
          }, response => {
            this.$message('删除失败')
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
