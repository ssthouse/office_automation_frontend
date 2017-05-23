<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="8"
              class="card-col"
              v-for="cardName in getCardList()">
        <div :is="componentMap[cardName]"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as Cons from '../base/Constant'
  import QuestionnaireCard from '../tools/questionnaire/QuestionnaireCard.vue'
  import MeetingCard from '../tools/meeting/MeetingCard.vue'
  import VotingCard from '../tools/voting/VotingCard.vue'
  import CalendarCard from './calendar/CalendarCard.vue'
  import CalendarDetail from './calendar/CalendarDetail.vue'
  import NewsCard from './news/NewsCard.vue'
  import News from './news/News.vue'
  import ImgNewsCard from './img_news/ImgNewsCard.vue'

  Vue.component(QuestionnaireCard.name, QuestionnaireCard)
  Vue.component(MeetingCard.name, MeetingCard)
  Vue.component(VotingCard.name, VotingCard)
  Vue.component(CalendarCard.name, CalendarCard)
  Vue.component(CalendarDetail.name, CalendarDetail)
  Vue.component(NewsCard.name, NewsCard)
  Vue.component(News.name, News)
  Vue.component(ImgNewsCard.name, ImgNewsCard)

  export default{
    name: 'homepage-main-tab',
    data () {
      return {
        componentMap: Cons.ComponentMap,
        cardNameList: []
      }
    },
    props: [],
    methods: {
      getCardList () {
        return this.$store.getters.getHomePageConfig
      }
    },
    created: function () {}
  }
</script>

<style>

</style>
