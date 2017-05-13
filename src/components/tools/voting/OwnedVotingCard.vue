<template>
  <div>
    <el-card class="card-panel">
      <div slot="header" class="card-header">
        <span class="card-title">我发起的投票</span>
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
      <div class="card-body">
        <div v-for="voting in ownedVotingList">
          <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
            <a class="card-link"
               @click="onClickVoting(voting)"
               href="javascript:void(0);">{{voting.title}}
            </a>
            <el-button @click="clickEditVoting(voting)"
                       type="text"
                       :disabled="voting.published"
                       style="float: right">
              编辑
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as MUTATION_TYPES from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import Voting from './Voting.vue'
  import VotingReport from './VotingReport.vue'
  import * as EventBus from '../../base/EventBus'
  import Utils from '../../base/Utils'

  export default{
    name: 'voting-admin-card',
    data () {
      return {
        MUTATION_TYPES
      }
    },
    props: [],
    methods: {
      refreshData () {
        this.$store.dispatch(MUTATION_TYPES.ACTION_FETCH_OWNED_VOTING)
          .then(success => {
            console.log(success)
          }, fail => {
            console.log(fail)
          })
      },
      onAdd () {
        this.$store.commit(MUTATION_TYPES.TOOLS_ADD_TAB, new TabItem('新建投票', Voting.name, null))
      },
      onClickVoting (voting) {
        Utils.jumpToTools()
        this.$store.commit(MUTATION_TYPES.TOOLS_ADD_TAB, new TabItem(voting.title + '-统计数据', VotingReport.name, voting))
      },
      clickEditVoting (voting) {
        Utils.jumpToTools()
        let tabItem = new TabItem(voting.title, Voting.name, voting)
        this.$store.commit(MUTATION_TYPES.TOOLS_ADD_TAB, tabItem)
      }
    },
    computed: {
      ownedVotingList () {
        return this.$store.getters.getOwnedVotingList
      }
    },
    created: function () {
      this.refreshData()
      // 注册投票数据刷新事件
      EventBus.instance.$on(EventBus.EVENT_VOTING_UPDATE, () => {
        this.refreshData()
      })
    }
  }
</script>

<style>

</style>
