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
        这里是列表
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as MUTATION_TYPES from '../../../store/mutation-types'
  import TabItem from '../../base/TabItem'
  import Voting from './Voting.vue'

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

      },
      onAdd () {
        this.$store.commit(MUTATION_TYPES.TOOLS_ADD_TAB, new TabItem('新建投票', Voting.name, ''))
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>

</style>
