<template>
  <div>
    <el-card style="margin-left: 10px; margin-right: 10px;">
      <!--标题-->
      <div slot="header" style="height: 20px">
        <span class="span">我的问卷</span>
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
        <div v-for="questionnaire in ownedQuestionnaireList" style="margin-top: 5px; margin-bottom: 5px">
          <a style="text-align: left; color: black;"
             href="javascript:void(0);">{{questionnaire.title}} </a>
          <el-button @click="clickQuestionnaire(questionnaire)"
                     type="text"
                     :disabled="questionnaire.published"
                     style="margin-left: 20px;">
            编辑
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Questionnaire from './Questionnaire.vue'
  import TabItem from '../../base/TabItem'
  import * as types from '../../../store/mutation-types'

  export default{
    name: '',
    data () {
      return {
        types,
        Questionnaire
      }
    },
    props: [],
    methods: {
      onAdd: function () {
        this.$store.commit(types.TOOLS_ADD_TAB, new TabItem('新建调查问卷', Questionnaire.name))
      },
      clickQuestionnaire (questionnaire) {
        console.log(questionnaire)
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
