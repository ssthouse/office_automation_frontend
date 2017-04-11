<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <!--标题-->
      <div slot="header" style="height: 20px">
        <span class="card-title">我管理的问卷</span>
        <el-button-group style="float: right;">
          <el-button size="small"
                     icon="plus"
                     @click="onAdd">

          </el-button>
          <el-button size="small"
                     @click="refreshData">
            刷新
          </el-button>
        </el-button-group>
      </div>
      <!--问卷列表-->
      <div style="height: 200px; overflow-y: scroll;">
        <div v-for="questionnaire in ownedQuestionnaireList"
             style="margin-top: 5px; margin-bottom: 5px">
          <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
            <a @click="clickQuestionnaire(questionnaire)"
               class="card-link"
               href="javascript:void(0);">{{questionnaire.title}} </a>
            <el-button @click="clickEditQuestionnaire(questionnaire)"
                       type="text"
                       :disabled="questionnaire.published"
                       style="margin-left: 20px;">
              编辑
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Questionnaire from './Questionnaire.vue'
  import AnswerReport from './QuestionnaireReport.vue'
  import QuestionnaireBean from './bean/questionnaire'
  import TabItem from '../../base/TabItem'
  import * as types from '../../../store/mutation-types'

  export default{
    name: 'questionnaire-admin-card',
    data () {
      return {
        types,
        Questionnaire
      }
    },
    props: [],
    methods: {
      onAdd: function () {
        let questionnaire = QuestionnaireBean.getEmptyQuestionnaire()
        this.$store.commit(types.TOOLS_ADD_TAB, new TabItem('新建调查问卷', Questionnaire.name, questionnaire))
      },
      clickQuestionnaire (questionnaire) {
        let tabItem = new TabItem(questionnaire.title, AnswerReport.name, questionnaire)
        this.$store.commit(types.TOOLS_ADD_TAB, tabItem)
      },
      clickEditQuestionnaire (questionnaire) {
        let tabItem = new TabItem(questionnaire.title, Questionnaire.name, questionnaire)
        this.$store.commit(types.TOOLS_ADD_TAB, tabItem)
      },
      refreshData () {
        this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
          .then(success => {
            this.$message(success)
          }, error => {
            this.$message(error)
          })
      }
    },
    computed: {
      ownedQuestionnaireList () {
        return this.$store.getters.getOwnedQuestionnaireList
      }
    },
    created: function () {
      // 请求问卷数据 => 但是不提示用户
      this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
    }
  }
</script>

<style>

</style>
