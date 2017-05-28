<template>
  <div>
    <el-card class="card" style="margin-left: 10px; margin-right: 10px;">
      <div slot="header">
        <span style="font-size: large;">新建公告:</span>
      </div>
      <el-form :model="news"
               label-width="100px;">
        <el-form-item label="公告标题:">
          <el-input v-model="news.title"></el-input>
        </el-form-item>
        <el-form-item label="公告链接:">
          <el-input v-model="news.link"></el-input>
        </el-form-item>

        <el-button type="primary"
                   :disabled="finished"
                   @click="onSubmit()">提交公告
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import News from './bean/news'
  import * as Cons from '../../base/Constant'
  import * as EventBus from '../../base/EventBus'

  export default{
    name: 'news',
    data () {
      return {
        news: News.newInstance(),
        finished: false
      }
    },
    props: [],
    methods: {
      onSubmit () {
        if (News.isEmpty(this.news)) {
          this.$message('公告未填写完整')
          return
        }
        // 填充创建者
        this.news.creater = this.$store.state.mainModule.user.username
        this.postNews()
      },
      postNews () {
        this.$http.post(Cons.BASE_URL + '/news/new', JSON.stringify(this.news))
          .then(response => {
            if (response.body.ok !== true) {
              this.$message('提交失败')
              return
            }
            this.$message('提交成功')
            EventBus.instance.$emit(EventBus.EVENT_HOMEPAGE_UPDATE_NEWS)
            this.finished = true
          }, response => {
            this.$message('提交失败')
          })
      }
    },
    computed: {},
    created: function () {
    }
  }
</script>

<style>

</style>
