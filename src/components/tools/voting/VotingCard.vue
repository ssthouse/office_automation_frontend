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
        这里是列表
      </div>
    </el-card>
  </div>
</template>
<script>
  export default{
    name: '',
    data () {
      return {}
    },
    props: [],
    methods: {
      refreshData () {
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>
  .card-title {
    float: left;
  }
</style>
