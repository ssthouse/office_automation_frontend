<template>
  <div style="margin-top: -40px;">
    <el-row>
      <el-col :span="8"
              class="card-col"
              v-for="configName in toolsPageConfig">
        <div v-bind:is="getComponentIs(toolsPageConfig.indexOf(configName))">

        </div>
      </el-col>
    </el-row>

    <hr/>
    <el-collapse style="margin: 20px;">
      <el-collapse-item title="设置"
                        style="text-align: left;">
        <el-checkbox-group v-model="newPageConfig">
          <el-checkbox :label="Cons.TOOLS_QUESTIONNAIRE">我的问卷</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_QUESTIONNAIRE_ADMIN">我管理的问卷</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_VOTING">我的投票</el-checkbox>
          <el-checkbox :label="Cons.TOOLS_VOTING_ADMIN">我管理的投票</el-checkbox>
          <el-button @click="updateConfig()"
                     style="margin-left: 40px;">更新设置
          </el-button>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import * as Cons from '../base/Constant'
  import * as types from '../../store/mutation-types'
  import {EventBus} from '../base/EventBus'
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
        componentDic: Cons.ToolsPageComponent,
        Cons: Cons,
        newPageConfig: []
      }
    },
    props: ['is'],
    components: {},
    computed: {},
    methods: {
      getComponentIs (index) {
        let configName = this.toolsPageConfig[index]
        let componentName = Cons.ToolsPageComponent[configName]
        return componentName
      },
      updateConfig () {
        console.log(this.newPageConfig)
        this.$store.dispatch(types.ACTION_POST_USER_CONFIG_TOOLS, this.newPageConfig.join(','))
          .then(success => {
            this.$message('更新成功')
            EventBus.$emit(Cons.EVENT_MAIN_UPDATE_USER_CONFIG)
          }, fail => {
            this.$message('更新失败')
          })
      },
      getConfig () {
        // update config from store
        let component = this
        this.toolsPageConfig = this.$store.getters.getToolsPageConfig
        // update the setting panel
        component.newPageConfig = []
        this.toolsPageConfig.forEach(function (configName) {
          component.newPageConfig.push(configName)
        })
      }
    },
    created: function () {
      // init config
      this.getConfig()
      // register config change event
      EventBus.$on(Cons.EVENT_MAIN_UPDATE_USER_CONFIG, () => {
        this.getConfig()
      })
    }
  }
</script>

<style>
  .card-col {
    margin-top: 20px;
  }
</style>
