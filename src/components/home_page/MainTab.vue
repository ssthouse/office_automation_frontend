<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="8">
        <img-news-card class="card-col"></img-news-card>
      </el-col>
      <el-col :span="8">
        <news-card class="card-col"></news-card>
      </el-col>
      <el-col :span="8">
        <calendar-card class="card-col"></calendar-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import TabItem from '../base/TabItem'
  import Questionnaire from '../tools/questionnaire/Questionnaire.vue'

  export default{
    name: 'homepage-main-tab',
    data () {
      return {}
    },
    props: [],
    methods: {
      addTab () {
        this.$store.commit(types.HOMEPAGE_ADD_TAB, new TabItem('新建问卷调查', Questionnaire.name, ''))
      }
    }
  }
</script>

<style>

</style>
