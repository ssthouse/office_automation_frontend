<template>
  <div>
    <el-col :span="8">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 4">
          <h3>{{item}}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </div>
</template>

<script>
  export default{
    name: '',
    data () {
      return {}
    },
    props: []
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
