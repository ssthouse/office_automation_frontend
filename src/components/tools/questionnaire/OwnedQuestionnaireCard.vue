<template>
  <el-card style="margin-left: 10px; margin-right: 10px;">
    <!--标题-->
    <div slot="header" class="card-header">
      <span class="card-title">我管理的问卷</span>
      <el-button-group style="float: right;">
        <el-button size="small"
                   icon="plus"
                   @click="onAdd"></el-button>
        <el-button size="small"
                   @click="refreshData">
          刷新
        </el-button>
      </el-button-group>
    </div>
    <!--问卷列表-->
    <div class="card-body">
      <div v-for="questionnaire in ownedQuestionnaireList"
           style="margin-top: 5px; margin-bottom: 5px">
        <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
          <a @click="clickQuestionnaire(questionnaire)"
             class="card-link"
             href="javascript:void(0);">{{questionnaire.title}} </a>
          <el-button @click="clickEditQuestionnaire(questionnaire)"
                     type="text"
                     :disabled="questionnaire.published"
                     style="float: right">
            {{getControlText(questionnaire.published)}}
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  //  import Questionnaire from './Questionnaire.vue'
  import QuestionnaireReport from './QuestionnaireReport.vue'
  import QuestionnaireBean from './bean/questionnaire'
  import TabItem from '../../base/TabItem'
  import * as MUTATIONS from '../../../store/mutation-types'
  import * as EventBus from '../../base/EventBus'
  import Utils from '../../base/Utils'

  export default{
    name: 'questionnaire-admin-card',
    data () {
      return {}
    },
    props: [],
    methods: {
      onAdd: function () {
        let questionnaire = QuestionnaireBean.getEmptyQuestionnaire()
        this.$store.commit(MUTATIONS.TOOLS_ADD_TAB, new TabItem('新建调查问卷', 'questionnaire', questionnaire))
      },
      clickQuestionnaire (questionnaire) {
        Utils.jumpToTools()
        let tabItem = new TabItem(questionnaire.title, QuestionnaireReport.name, questionnaire)
        this.$store.commit(MUTATIONS.TOOLS_ADD_TAB, tabItem)
      },
      clickEditQuestionnaire (questionnaire) {
        Utils.jumpToTools()
        let tabItem = new TabItem(questionnaire.title, 'questionnaire', questionnaire)
        this.$store.commit(MUTATIONS.TOOLS_ADD_TAB, tabItem)
      },
      refreshData () {
        this.$store.dispatch(MUTATIONS.ACTION_FETCH_QUESTIONNAIRE)
          .then(success => {
            this.$message(success)
          }, error => {
            this.$message(error)
          })
      },
      getControlText (isPublished) {
        if (isPublished) {
          return '已发布'
        } else {
          return '草稿'
        }
      }
    },
    computed: {
      ownedQuestionnaireList () {
        return this.$store.getters.getOwnedQuestionnaireList
      }
    },
    created: function () {
      // 请求问卷数据 => 但是不提示用户
      this.$store.dispatch(MUTATIONS.ACTION_FETCH_QUESTIONNAIRE)
      // 注册问卷数据变化event
      EventBus.instance.$on(EventBus.EVENT_QUESTIONNAIRE_UPDATE, () => {
        this.$store.dispatch(MUTATIONS.ACTION_FETCH_QUESTIONNAIRE)
      })
    }
  }
</script>

<style>

</style>
