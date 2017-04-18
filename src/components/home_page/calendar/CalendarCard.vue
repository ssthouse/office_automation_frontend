<template>
  <el-card class="card-panel">
    <div slot="header"
         class="card-header">
      <span>工作日程</span>
      <el-button size="small"
                 icon="date"
                 style="float: right;"
                 @click="onClickDetail()"></el-button>
    </div>
    <div class="card-body">

    </div>
  </el-card>
</template>

<script>
  export default{
    name: 'calendar-card',
    data () {
      return {}
    },
    props: [],
    methods: {
      onClickDetail () {
        console.log('detail')
      }
    },
    computed: {},
    created: function () {

    }
  }
</script>

<style>

</style>
