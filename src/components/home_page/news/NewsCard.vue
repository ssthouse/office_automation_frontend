<template>
  <el-card class="card-panel">
    <div class="card-header"
         slot="header">
      <span>公告</span>
    </div>
    <div class="card-body">
      <div v-for="news in newsList"
           style="margin-top: 5px; margin-bottom: 5px">
        <div style="clear: both; margin-top: 10px; margin-bottom: 10px;">
          <a class="card-link"
             :href="links[1]"
             target="_blank">{{news}}</a>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default{
    name: 'news-card',
    data () {
      return {
        links: ['http://news.hustonline.net/article/97497.htm', 'http://news.hustonline.net/article/97493.htm',
          'http://news.hustonline.net/article/97481.htm', 'http://news.hustonline.net/article/97475.htm'],
        newsList: ['校园“十禁止”请你来监督', '王炎副教授在引力波天体物理研究领域取得进展',
          '第一批“登峰计划”进展交流会举行', '滇西应用技术大学代表团来校调研座谈']
      }
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
