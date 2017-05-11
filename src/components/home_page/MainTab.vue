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
  import * as Cons from '../base/Constant'

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
