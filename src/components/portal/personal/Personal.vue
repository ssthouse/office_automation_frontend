<script src="../../../store/mutation-types.js"></script>
<template>
  <div style="width: 100%; height: 100%">
    <el-tabs type="card"
             @tab-click="handleClick"
             @tab-remove="handleRemove"
             class="content_tabs">
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
        <div :is="tab.contentIs"
             class="tab_content"></div>
      </el-tab-pane>

      <!--<el-tab-pane label="配置管理"-->
      <!--closable>-->
      <!--<div :is="questionnaire"></div>-->
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="角色管理"-->
      <!--closable>角色管理-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'
  import Questionnaire from './questionnaire/Questionnaire.vue'
  import * as types from '../../../store/mutation-types.js'

  export default{
    name: '',
    data () {
      return {
        tabsStatus: {
          questionnaire: false
        },
        questionnaire: 'questionnaireCard'
      }
    },
    computed: {
      tabs: function () {
        return this.$store.state.portalModule.personal_tabs
      }
    },
    props: {},
    /**
     * 需要用到的子组件
     */
    components: {
      'questionnaireCard': QuestionnaireCard,
      'questionnaire': Questionnaire
    },
    methods: {
      handleClick: function () {
      },
      handleRemove: function (tab, event) {
        console.log(tab.index)
        this.$store.commit(types.PORTAL_REMOVE_TAB, tab.index)
      }
    }
  }
</script>

<style type="text/css">
  .content_tabs {
    background-color: white;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  /*.tab_content {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*overflow-y: scroll;*/
  /*}*/
</style>
