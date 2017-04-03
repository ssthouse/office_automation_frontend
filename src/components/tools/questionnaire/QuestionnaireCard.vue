<template>
  <div>
    <el-card class="card-panel">
      <!--标题-->
      <div slot="header" class="card-header">
        <span class="card-title">待填问卷</span>
        <el-button-group style="float: right;">
          <el-button size="small"
                     @click="refreshData">
            刷新
          </el-button>
        </el-button-group>
      </div>
      <!--问卷列表-->
      <div v-loading.body=isLoading class="card-body">
        <div v-for="questionnaire in questionnaireList" style="margin-top: 5px; margin-bottom: 5px">
          <a style="text-align: left; color: black;"
             href="javascript:void(0);"
             @click="clickQuestionnaire(questionnaire)">{{questionnaire.title}} </a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import QuestionnaireFill from './QuestionnaireFill.vue'
  import TabItem from '../../base/TabItem'

  export default{
    data () {
      return {
        isLoading: false,
        isDeleting: false
      }
    },
    methods: {
      refreshData: function () {
        let component = this
        this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
          .then(function (success) {
            component.$message(success)
          }, function (fail) {
            component.$message(fail)
          })
      },
      // 打开填写问卷的tab
      clickQuestionnaire: function (questionnaire) {
        console.log(questionnaire.title)
        this.$store.commit(types.TOOLS_ADD_TAB, new TabItem(questionnaire.title, QuestionnaireFill.name, questionnaire))
      }
    },
    computed: {
      questionnaireList: function () {
        return this.$store.getters.getQuestionnaireList
      }
    },
    created: function () {
      // 加载问卷数据
      let component = this
      this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
        .then(function (success) {
          component.$message(success)
        }, function (fail) {
          component.$message(fail)
        })
    },
    props: []
  }
</script>

<style>
  .span {
    line-height: 28px;
  }

  .card-panel {
    margin-left: 10px;
    margin-right: 10px;
  }

  .card-header {
    height: 20px;
  }

  .card-body {
    height: 200px;
    overflow-y: scroll;
  }
</style>
