<template>
  <div>
    <el-card class="card-panel">
      <div slot="header" class="card-header">
        <span class="card-title">待投票</span>
        <el-button-group style="float: right;">
          <el-button size="small"
                     @click="refreshData">
            刷新
          </el-button>
        </el-button-group>
      </div>

      <div class="card-body">
        <div v-for="voting in openVotingList">
          <div style="clear: both; margin-top: 5px; margin-bottom: 5px;">
            <a @click="onClickVoting(voting)"
               class="card-link"
               href="javascript:void(0);">
              {{voting.title}}
            </a>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import * as MUTATION_TYPES from '../../../store/mutation-types'

  export default{
    name: '',
    data () {
      return {
        MUTATION_TYPES
      }
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

      }
    },
    computed: {
      openVotingList () {
        return this.$store.getters.getOpenVotingList
      }
    },
    created: function () {
      this.refreshData()
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
