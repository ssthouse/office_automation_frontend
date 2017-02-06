<template>
  <div style="width: 100%; height: 100%">
    <el-col style="width: 100%; height: 100%">
      <el-tabs type="card"
               @tab-click="handleClick"
               @tab-remove="handleRemove">
        <!--个人主业标签-->
        <el-tab-pane label="个人主页">
          <el-col :span="12">
            <questionnaireCard key="questionnaire"></questionnaireCard>
          </el-col>
        </el-tab-pane>
        <!--其他动态增加减少的标签-->
        <el-tab-pane v-for="tab in tabs"
                     closable
                     :label="tab.label">
          {{tab.content}}
        </el-tab-pane>
        <el-tab-pane label="调查问卷"
                     :hidden="tabsStatus.questionnaire"
                     closable>
          <questionnaire></questionnaire>
        </el-tab-pane>

        <el-tab-pane label="配置管理"
                     closable>配置管理
        </el-tab-pane>
        <el-tab-pane label="角色管理"
                     closable>角色管理
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>

<script>
  import QuestionnaireCard from './QuestionnaireCard.vue'
  import Questionnaire from './Questionnaire.vue'

  export default{
    name: '',
    data () {
      return {
        tabsStatus: {
          questionnaire: false
        },
        tabs: [{
          label: 'lable1',
          content1: 'content1'
        }, {
          label: 'lable1',
          content1: 'content1'
        }]
      }
    },
    props: [],
    components: {
      'questionnaireCard': QuestionnaireCard,
      'questionnaire': Questionnaire
    },
    methods: {
      handleClick: function () {
      },
      handleRemove: function () {
      }
    }
  }
</script>

<style type="text/css">
  .el-tabs {
    background-color: white;
    width: 100%;
    height: 100%;
  }
</style>
