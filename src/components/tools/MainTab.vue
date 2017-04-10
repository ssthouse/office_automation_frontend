<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="12"
              class="card-col"
              v-for="configName in toolsPageConfig">
        <div v-bind:is="getComponentIs(toolsPageConfig.indexOf(configName))">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as Cons from '../base/Constant'
  // 问卷模块
  import QuestionnaireCard from './questionnaire/QuestionnaireCard.vue'
  import OwnedQuestionnaireCard from './questionnaire/OwnedQuestionnaireCard.vue'
  // 投票模块
  import VotingCard from './voting/VotingCard.vue'
  import OwnedVotingCard from './voting/OwnedVotingCard.vue'
  // Vue
  import Vue from 'vue'

  Vue.component(QuestionnaireCard.name, QuestionnaireCard)
  Vue.component(OwnedQuestionnaireCard.name, OwnedQuestionnaireCard)
  Vue.component(VotingCard.name, VotingCard)
  Vue.component(OwnedVotingCard.name, OwnedVotingCard)

  export default{
    name: 'tools-main-tab',
    data () {
      return {
        toolsPageConfig: this.$store.getters.getToolsPageConfig,
        componentDic: Cons.ToolsPageComponent
      }
    },
    props: ['is'],
    components: {},
    computed: {},
    methods: {
      getComponentIs (index) {
        let configName = this.toolsPageConfig[index]
        let componentName = Cons.ToolsPageComponent[configName]
        console.log(configName + '    ' + componentName)
        return componentName
      }
    },
    created: function () {
      console.log(this.toolsPageConfig)
      console.log(Cons.ToolsPageComponent)
    }
  }
</script>

<style>
  .card-col {
    margin-top: 20px;
  }
</style>
