<template>
  <div>
    <el-card class="card-panel">
      <div class="card-header"
           slot="header">
        <span>图片新闻</span>
      </div>
      <div style="height: 160px;">
        <el-carousel>
          <el-carousel-item>
            <img src="../../../assets/img_news_1.jpg"
                 style="height: 160px;">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../../assets/img_news_2.jpg"
                 style="height: 160px;">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../../assets/img_news_3.jpg"
                 style="height: 160px;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default{
    name: 'img-news-card',
    data () {
      return {}
    },
    props: [],
    methods: {},
    computed: {},
    created: function () {

    }
  }
</script>

<style>

</style>
