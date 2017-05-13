<template>
  <el-card class="card-panel">
    <div slot="header" class="card-header">
      <span class="card-title">待投票</span>
      <el-button size="small"
                 style="float: right"
                 @click="refreshData">
        刷新
      </el-button>
    </div>

    <div class="card-body">
      <div v-for="voting in openVotingList">
        <el-row style=" margin-top: 5px; margin-bottom: 10px;">
          <a @click="onClickVoting(voting)"
             class="card-link"
             href="javascript:void(0);">
            {{voting.title}}
          </a>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
  import * as MUTATION_TYPES from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import VotingFill from './VotingFill.vue'
  import * as EventBus from '../../base/EventBus'
  import Utils from '../../base/Utils'

  export default{
    name: 'voting-card',
    data () {
      return {}
    },
    props: [],
    methods: {
      refreshData () {
        this.$store.dispatch(MUTATION_TYPES.ACTION_FETCH_OPEN_VOTING)
          .then(success => {
            console.log(success)
          }, fail => {
            console.log(fail)
          })
      },
      onClickVoting (voting) {
        Utils.jumpToTools()
        this.$store.commit(MUTATION_TYPES.TOOLS_ADD_TAB, new TabItem(voting.title, VotingFill.name, voting))
      }
    },
    computed: {
      openVotingList () {
        return this.$store.getters.getOpenVotingList
      }
    },
    created: function () {
      this.refreshData()
      EventBus.instance.$on(EventBus.EVENT_VOTING_UPDATE, () => {
        this.refreshData()
      })
    }
  }
</script>

<style>
  .card-title {
    float: left;
  }

  .card-link {
    text-align: left;
    color: black;
    float: left;
  }
</style>
