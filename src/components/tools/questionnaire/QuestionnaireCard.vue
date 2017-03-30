<template>
  <div>
    <el-card>
      <!--标题-->
      <div slot="header" style="height: 20px">
        <span class="span">调查问卷</span>
        <el-button-group style="float: right;">
          <el-button size="small"
                     icon="delete"
                     :loading="isDeleting"
                     @click="onDeleting"></el-button>
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
      <div v-loading.body=isLoading>
        <div v-for="questionnaire in questionnaireList">
          {{questionnaire.title}}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import Questionnaire from './Questionnaire.vue'
  import TabItem from '../../base/TabItem'

  export default{
    data () {
      return {
        // TODO: 测试用数据
//        questionnaireList: [{
//          title: 'this is the title',
//          // 用于在后台找到问卷列表的 id
//          questionnaireId: 1
//        }, {
//          title: 'this is the title',
//          // 用于在后台找到问卷列表的 id
//          questionnaireId: 1
//        }, {
//          title: 'this is the title',
//          // 用于在后台找到问卷列表的 id
//          questionnaireId: 1
//        }],
        isLoading: false,
        isDeleting: false
      }
    },
    methods: {
      onDeleting: function () {
        this.isDeleting = true
        var vue = this
        window.setTimeout(function () {
          vue.questionnaireList = []
          vue.isDeleting = false
          vue.isLoading = false
        }, 10000)
      },
      onAdd: function () {
        this.$store.commit(types.TOOLS_ADD_TAB, new TabItem('调查问卷', Questionnaire.name))
      },
      refreshData: function () {
        let component = this
        this.$store.dispatch(types.ACTION_FETCH_QUESTIONNAIRE)
          .then(function (success) {
            component.$message(success)
          }, function (fail) {
            component.$message(fail)
          })
      }
    },
    computed: {
      questionnaireList: function () {
        return this.$store.getters.getQuestionnaireList
      },
      ownedQuestionnaireList: function () {
        return this.$store.getters.getOwnedQuestionnaireList
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
</style>
