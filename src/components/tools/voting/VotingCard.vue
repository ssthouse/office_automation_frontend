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
  const URL_POST_NEW_VOTING = 'http://127.0.0.1:8080/office_automation_backend/voting/new'

  export default{
    name: '',
    data () {
      return {}
    },
    props: [],
    methods: {
      refreshData () {
        this.$http.post(URL_POST_NEW_VOTING, '')
          .then(response => {

          }, response => {

          })
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
