<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="8"
              class="card-col"
              v-for="cardName in cardNameList">
        <div :is="componentMap[cardName]"></div>
      </el-col>
      <!--<el-col :span="8">-->
      <!--<img-news-card class="card-col"></img-news-card>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<news-card class="card-col"></news-card>-->
      <!--</el-col>-->
      <!--<el-col :span="8">-->
      <!--<calendar-card class="card-col"></calendar-card>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import * as EventBus from '../base/EventBus'
  import * as MUTATIONS from '../../store/mutation-types'
  import * as Cons from '../base/Constant'

  export default{
    name: 'homepage-main-tab',
    data () {
      return {
        componentMap: Cons.ComponentMap,
        cardNameList: [],
        newConfig: []
      }
    },
    props: [],
    methods: {
      getConfigCardList () {
        let _this = this
        this.cardNameList = this.$store.getters.getHomePageConfig
        this.cardNameList.forEach(function (cardName) {
          _this.newConfig.push(cardName)
        })
      },
      updateConfig () {
        console.log(this.newConfig)
        this.$store.dispatch(MUTATIONS.ACTION_POST_USER_CONFIG_HOMEPAGE, this.newConfig.join(','))
          .then(success => {
            this.$message('更新成功')
            EventBus.instance.$emit(EventBus.EVENT_MAIN_UPDATE_USER_CONFIG)
          }, fail => {
            this.$message('更新失败')
          })
      }
    },
    created: function () {
      EventBus.instance.$on(EventBus.EVENT_MAIN_UPDATE_USER_CONFIG, () => {
        this.getConfigCardList()
      })
    }
  }
</script>

<style>

</style>
