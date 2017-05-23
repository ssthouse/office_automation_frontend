<template>
  <div>
    <el-card class="card-panel">
      <!--标题-->
      <div slot="header" class="card-header">
        <span class="card-title">待填问卷</span>
        <el-button size="small"
                   style="float: right"
                   @click="refreshData">
          刷新
        </el-button>
      </div>
      <!--问卷列表-->
      <div v-loading.body=isLoading class="card-body">
        <div v-for="questionnaire in questionnaireList"
             style="margin-top: 5px; margin-bottom: 5px">
          <el-row style="clear: both; margin-top: 5px; margin-bottom: 10px;">
            <a class="card-link"
               href="javascript:void(0);"
               @click="clickQuestionnaire(questionnaire)">
              {{questionnaire.title}} </a>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import QuestionnaireFill from './QuestionnaireFill.vue'
  import TabItem from '../../base/TabItem'
  import * as EventBus from '../../base/EventBus'
  import Utils from '../../base/Utils'

  export default{
    name: 'questionnaire-card',
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
        Utils.jumpToTools()
        this.$store.commit(types.TOOLS_ADD_TAB, new TabItem(questionnaire.title, QuestionnaireFill.name, questionnaire))
      },
      fetchQuestionnaire () {
        // 加载问卷数据
        let component = this
        this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
          .then(function (success) {
            // component.$message(success)
          }, function (fail) {
            component.$message(fail)
          })
      }
    },
    computed: {
      questionnaireList: function () {
        return this.$store.getters.getQuestionnaireList
      }
    },
    created: function () {
      this.fetchQuestionnaire()
      EventBus.instance.$on(EventBus.EVENT_QUESTIONNAIRE_UPDATE, () => {
        this.fetchQuestionnaire()
      })
    },
    props: []
  }
</script>

<style>
  .card-panel {
    margin-left: 5px;
    margin-right: 5px;
  }

  .card-header {
    height: 15px;
  }

  .card-body {
    height: 160px;
    overflow-y: scroll;
  }
</style>
